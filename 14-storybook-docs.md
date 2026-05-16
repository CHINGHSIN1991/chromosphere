# Ch14：Storybook 與文件自動化

## 關鍵知識點

- Storybook 在元件庫中的角色
- Story 的三種寫法（CSF 3.0）
- `controls` 讓文件可互動
- `a11y` 插件自動偵測無障礙問題
- `autodocs` 自動從程式碼生成 API 文件
- 在 monorepo 中設定 Storybook

---

## 1. Storybook 的角色

在元件庫中，Storybook 扮演三個角色：

```
┌─────────────────────────────────────────┐
│  1. 元件開發環境                          │
│     不需要起一個完整的應用就能開發元件      │
├─────────────────────────────────────────┤
│  2. 互動式文件                            │
│     使用者可以在瀏覽器中實際操作元件        │
├─────────────────────────────────────────┤
│  3. 視覺回歸測試                          │
│     配合 Chromatic 偵測 UI 的意外變化      │
└─────────────────────────────────────────┘
```

---

## 2. 安裝 Storybook

在 playground/react 或建立專屬的 storybook package：

```bash
cd playground/react
pnpm dlx storybook@latest init
```

這會自動：
1. 安裝 Storybook 依賴
2. 建立 `.storybook/` 設定目錄
3. 建立範例 story 檔案

---

## 3. 編寫 Accordion Story

### CSF 3.0 格式（Component Story Format）

```typescript
// packages/react/src/components/accordion/accordion.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from './accordion'

// Meta：描述這個元件
const meta: Meta<typeof Accordion.Root> = {
  title: 'Components/Accordion',  // Storybook 側邊欄路徑
  component: Accordion.Root,       // 主要元件（控制面板根據此元件的 props 生成）
  tags: ['autodocs'],              // 啟用自動文件生成
  argTypes: {
    multiple: {
      description: '是否允許同時展開多個 item',
      control: 'boolean',
    },
    defaultValue: {
      description: '預設展開的 item 值陣列',
      control: 'object',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Accordion.Root>

// ===== Stories =====

// 基本用法
export const Default: Story = {
  render: (args) => (
    <Accordion.Root {...args}>
      <Accordion.Item value="item-1">
        <Accordion.ItemTrigger>第一個問題</Accordion.ItemTrigger>
        <Accordion.ItemContent>第一個答案的詳細內容</Accordion.ItemContent>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.ItemTrigger>第二個問題</Accordion.ItemTrigger>
        <Accordion.ItemContent>第二個答案的詳細內容</Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  ),
}

// 預設展開
export const DefaultOpen: Story = {
  args: {
    defaultValue: ['item-1'],
  },
  render: Default.render,
}

// 允許多個同時展開
export const Multiple: Story = {
  args: {
    multiple: true,
  },
  render: Default.render,
}

// 受控模式
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>([])

    return (
      <>
        <p>目前展開：{value.join(', ') || '（全部收合）'}</p>
        <Accordion.Root value={value} onValueChange={setValue}>
          {/* ... */}
        </Accordion.Root>
      </>
    )
  },
}
```

---

## 4. `controls` 讓文件可互動

Storybook 的 `controls` 插件（預設啟用）讓使用者在瀏覽器中直接修改 props：

```typescript
argTypes: {
  multiple: {
    control: 'boolean',              // 顯示為 checkbox
  },
  defaultValue: {
    control: 'object',               // 顯示為 JSON 編輯器
  },
  disabled: {
    control: 'boolean',
  },
  onValueChange: {
    action: 'onValueChange',         // 在 Actions 面板顯示呼叫記錄
  },
}
```

---

## 5. `a11y` 插件

自動偵測 ARIA 問題：

```bash
pnpm add -D @storybook/addon-a11y
```

```typescript
// .storybook/main.ts
export default {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',  // 加入這個
  ],
}
```

在每個 Story 下方會出現 Accessibility 標籤，顯示：
- 違規（Violations）
- 通過（Passes）
- 不適用（Incomplete）

---

## 6. `autodocs` 自動文件

在 meta 中加入 `tags: ['autodocs']` 後，Storybook 會自動根據：
- TypeScript 型別（從 props 型別生成表格）
- JSDoc 注釋（作為說明文字）
- Stories（作為使用範例）

生成完整的 API 文件頁面。

```typescript
export interface AccordionRootProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * 非受控模式的初始展開值
   * @default []
   */
  defaultValue?: string[]

  /**
   * 受控模式的展開值
   */
  value?: string[]

  /**
   * 狀態改變時的回調函式
   */
  onValueChange?: (value: string[]) => void
}
```

---

## 7. Monorepo 中的 Storybook 設定

在 monorepo 中，可以在根目錄或 playground 目錄設定 Storybook：

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: [
    // 從所有 packages 收集 stories
    '../packages/react/src/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
}

export default config
```

---

## 8. Chromatic 視覺回歸測試

[Chromatic](https://www.chromatic.com/) 是 Storybook 的雲端視覺測試服務：

```bash
# 安裝
pnpm add -D chromatic

# 每次部署時執行
pnpm chromatic --project-token=<your-token>
```

**運作方式：**
1. Chromatic 為每個 Story 截圖
2. 與上一版本比較
3. 如果有像素差異，標記為「待審核」
4. 開發者手動確認是故意的改動還是 bug

---

## 練習

1. 在 playground/react 安裝 Storybook，執行 `pnpm storybook`
2. 為 Accordion 撰寫至少 3 個 Stories（Default、DefaultOpen、Controlled）
3. 安裝 `@storybook/addon-a11y`，找出 Accordion 中可能的無障礙問題
4. 在 AccordionRoot 的 props 上加入 JSDoc 注釋，觀察 autodocs 的效果

---

## 延伸閱讀

- [Storybook](https://storybook.js.org/)
- [CSF 3.0](https://storybook.js.org/blog/component-story-format-3-0/)
- [Storybook a11y 插件](https://storybook.js.org/addons/@storybook/addon-a11y)
- [Chromatic](https://www.chromatic.com/)
- [Ark UI Storybook](https://ark-ui.com/react/docs/components/accordion)
