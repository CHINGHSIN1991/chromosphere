# Ch11：測試策略

## 關鍵知識點

- 元件庫測試的三個層次
- React Testing Library 的核心理念
- 如何測試無障礙屬性（ARIA）
- 如何測試受控/非受控模式
- Playwright 的 E2E 測試場景
- `accordion.test.tsx` 骨架解析

---

## 1. 元件庫測試的三個層次

```
┌──────────────────────────────────────────────┐
│  E2E Tests (Playwright)                       │  ← 少量，測試真實使用場景
│  視覺回歸、跨瀏覽器、完整互動流程              │
├──────────────────────────────────────────────┤
│  Integration Tests (React Testing Library)   │  ← 主力，測試元件行為
│  使用者看到的行為、ARIA、鍵盤操作              │
├──────────────────────────────────────────────┤
│  Unit Tests                                  │  ← 少量，測試工具函式
│  純函式：状態計算、ID 生成等                   │
└──────────────────────────────────────────────┘
```

對於元件庫，**Integration Tests** 是最有價值的。

---

## 2. React Testing Library 核心理念

React Testing Library 的哲學：
> **「測試使用者看到的行為，而不是實作細節」**

```typescript
// ❌ 不要測試：內部狀態、DOM 結構、實作細節
expect(component.state.isOpen).toBe(true)
expect(wrapper.find('.accordion-item--open')).toHaveLength(1)

// ✅ 要測試：使用者可見的行為和無障礙語意
expect(screen.getByRole('button', { name: '第一個問題' })).toHaveAttribute('aria-expanded', 'true')
expect(screen.getByRole('region', { name: '第一個問題' })).toBeVisible()
```

### 選擇元素的優先順序

React Testing Library 推薦的選取方式（優先順序由高到低）：

1. `getByRole` — 最推薦，基於 ARIA role
2. `getByLabelText` — 適合表單元素
3. `getByPlaceholderText` — 適合 input
4. `getByText` — 根據文字內容
5. `getByDisplayValue` — 適合 select/input
6. `getByAltText` — 適合圖片
7. `getByTitle` — 較少用
8. `getByTestId` — 最後手段

---

## 3. Accordion 測試骨架

檔案位置：[`packages/react/src/components/accordion/accordion.test.tsx`](packages/react/src/components/accordion/accordion.test.tsx)

### 測試分類

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Accordion } from './accordion'

// 測試輔助元件
function TestAccordion({ multiple = false, defaultValue = [] }) {
  return (
    <Accordion.Root defaultValue={defaultValue} multiple={multiple}>
      <Accordion.Item value="item-1">
        <Accordion.ItemTrigger>第一個問題</Accordion.ItemTrigger>
        <Accordion.ItemContent>第一個答案</Accordion.ItemContent>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.ItemTrigger>第二個問題</Accordion.ItemTrigger>
        <Accordion.ItemContent>第二個答案</Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}

describe('Accordion', () => {
  // === 基本渲染 ===
  describe('Rendering', () => {
    test('預設所有 item 都是收合的', () => {
      render(<TestAccordion />)
      const triggers = screen.getAllByRole('button')
      triggers.forEach(trigger => {
        expect(trigger).toHaveAttribute('aria-expanded', 'false')
      })
    })

    test('defaultValue 可以設定初始展開的 item', () => {
      render(<TestAccordion defaultValue={['item-1']} />)
      expect(screen.getByRole('button', { name: '第一個問題' }))
        .toHaveAttribute('aria-expanded', 'true')
    })
  })

  // === 互動行為 ===
  describe('Interaction', () => {
    test('點擊 trigger 可以展開 item', async () => {
      const user = userEvent.setup()
      render(<TestAccordion />)

      await user.click(screen.getByRole('button', { name: '第一個問題' }))

      expect(screen.getByRole('button', { name: '第一個問題' }))
        .toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByText('第一個答案')).toBeVisible()
    })

    test('點擊已展開的 trigger 可以收合', async () => {
      const user = userEvent.setup()
      render(<TestAccordion defaultValue={['item-1']} />)

      await user.click(screen.getByRole('button', { name: '第一個問題' }))

      expect(screen.getByRole('button', { name: '第一個問題' }))
        .toHaveAttribute('aria-expanded', 'false')
    })

    test('single mode：展開新 item 時，舊 item 自動收合', async () => {
      const user = userEvent.setup()
      render(<TestAccordion defaultValue={['item-1']} multiple={false} />)

      await user.click(screen.getByRole('button', { name: '第二個問題' }))

      expect(screen.getByRole('button', { name: '第一個問題' }))
        .toHaveAttribute('aria-expanded', 'false')
      expect(screen.getByRole('button', { name: '第二個問題' }))
        .toHaveAttribute('aria-expanded', 'true')
    })

    test('multiple mode：可以同時展開多個 item', async () => {
      const user = userEvent.setup()
      render(<TestAccordion multiple={true} />)

      await user.click(screen.getByRole('button', { name: '第一個問題' }))
      await user.click(screen.getByRole('button', { name: '第二個問題' }))

      expect(screen.getByRole('button', { name: '第一個問題' }))
        .toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByRole('button', { name: '第二個問題' }))
        .toHaveAttribute('aria-expanded', 'true')
    })
  })

  // === 無障礙 ===
  describe('Accessibility', () => {
    test('trigger 有正確的 aria-controls 指向 content', () => {
      render(<TestAccordion />)
      const trigger = screen.getByRole('button', { name: '第一個問題' })
      const contentId = trigger.getAttribute('aria-controls')
      expect(document.getElementById(contentId!)).toBeInTheDocument()
    })

    test('content 有 role="region" 和 aria-labelledby', () => {
      render(<TestAccordion defaultValue={['item-1']} />)
      const region = screen.getByRole('region', { name: '第一個問題' })
      expect(region).toBeInTheDocument()
    })

    test('Enter 鍵可以切換展開狀態', async () => {
      const user = userEvent.setup()
      render(<TestAccordion />)

      const trigger = screen.getByRole('button', { name: '第一個問題' })
      trigger.focus()
      await user.keyboard('{Enter}')

      expect(trigger).toHaveAttribute('aria-expanded', 'true')
    })
  })

  // === 受控模式 ===
  describe('Controlled mode', () => {
    test('受控模式：外部可以控制展開狀態', async () => {
      const onValueChange = jest.fn()
      const user = userEvent.setup()

      render(
        <Accordion.Root value={[]} onValueChange={onValueChange}>
          <Accordion.Item value="item-1">
            <Accordion.ItemTrigger>問題</Accordion.ItemTrigger>
            <Accordion.ItemContent>答案</Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      )

      await user.click(screen.getByRole('button', { name: '問題' }))

      expect(onValueChange).toHaveBeenCalledWith(['item-1'])
    })
  })
})
```

---

## 4. 測試設定

### 安裝依賴

```bash
pnpm add -D @testing-library/react @testing-library/user-event @testing-library/jest-dom vitest jsdom
```

### Vitest 設定（推薦替代 Jest）

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

```typescript
// src/test-setup.ts
import '@testing-library/jest-dom'
```

---

## 5. Playwright E2E 測試

Playwright 適合測試需要真實瀏覽器的場景：

```typescript
// tests/accordion.spec.ts
import { test, expect } from '@playwright/test'

test('Accordion 基本功能', async ({ page }) => {
  await page.goto('/playground')

  // 點擊 trigger
  await page.getByRole('button', { name: '第一個問題' }).click()

  // 確認 content 可見
  await expect(page.getByText('第一個答案')).toBeVisible()

  // 確認 ARIA 狀態
  await expect(page.getByRole('button', { name: '第一個問題' }))
    .toHaveAttribute('aria-expanded', 'true')
})

test('鍵盤導航', async ({ page }) => {
  await page.goto('/playground')

  // 用 Tab 聚焦到第一個 trigger
  await page.keyboard.press('Tab')

  // 用箭頭鍵導航到第二個 trigger
  await page.keyboard.press('ArrowDown')

  // 用 Enter 展開
  await page.keyboard.press('Enter')

  await expect(page.getByRole('button', { name: '第二個問題' }))
    .toHaveAttribute('aria-expanded', 'true')
})
```

---

## 練習

1. 打開 [`packages/react/src/components/accordion/accordion.test.tsx`](packages/react/src/components/accordion/accordion.test.tsx)，根據骨架補完測試案例
2. 實作 Accordion 後執行測試：`pnpm test`
3. 嘗試用 `getByRole` 而不是 `getByTestId` 找到元素（更貼近使用者視角）
4. 加入 `@axe-core/react` 做自動化無障礙稽核

---

## 延伸閱讀

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library 查詢優先順序](https://testing-library.com/docs/queries/about#priority)
- [Playwright](https://playwright.dev/)
- [Vitest](https://vitest.dev/)
- [@axe-core/react](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/react)
