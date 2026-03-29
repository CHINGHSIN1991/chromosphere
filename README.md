# Chromosphere

> 🎓 **學習用專案** — 參考 [Ark UI](https://github.com/chakra-ui/ark) 架構，從零打造的 Headless UI 元件庫。

無樣式、可存取的 UI 元件庫，為你的設計系統提供基礎。支援 React、Vue、Solid 和 Svelte。

## 📖 目錄

- [專案動機](#專案動機)
- [架構概覽](#架構概覽)
- [Monorepo 結構](#monorepo-結構)
- [安裝方式](#安裝方式)
- [各框架使用範例](#各框架使用範例)
- [元件清單](#元件清單)
- [開發指南](#開發指南)
- [設計原則](#設計原則)
- [學習筆記](#學習筆記)
- [參考資源](#參考資源)

---

## 專案動機

本專案的目的是透過自行實作一個跨框架的 Headless UI 元件庫，來深入學習以下概念：

- **狀態機 (State Machines)** — 如何用有限狀態機管理複雜的 UI 互動邏輯
- **Headless UI 模式** — 將邏輯與樣式完全分離的設計哲學
- **跨框架抽象** — 如何設計出支援 React / Vue / Solid / Svelte 的共用核心邏輯
- **無障礙 (Accessibility / a11y)** — WAI-ARIA 設計模式的實踐
- **Monorepo 管理** — 在一個倉庫中維護多個套件的工程實踐

> ⚠️ 本專案是學習用途，並非生產就緒 (production-ready) 的元件庫。

---

## 架構概覽

Chromosphere 的架構參考 Ark UI，採用三層式設計：

```
┌─────────────────────────────────────────────┐
│           Framework Adapters                │
│   (React, Vue, Solid, Svelte 各自的套件)      │
├─────────────────────────────────────────────┤
│          Core Logic (核心邏輯層)               │
│   狀態機 + 無障礙 + DOM 互動                    │
│   (框架無關的純邏輯)                            │
├─────────────────────────────────────────────┤
│          Anatomy (結構定義)                    │
│   定義每個元件的組成部分 (parts)                  │
└─────────────────────────────────────────────┘
```

### 核心概念

| 概念 | 說明 | 對應 Ark UI |
|------|------|-------------|
| **Core** | 框架無關的元件邏輯（狀態管理、事件處理） | `@zag-js/*` |
| **Anatomy** | 元件的結構組成定義 | `@zag-js/anatomy` |
| **Adapter** | 將核心邏輯適配到特定框架 | `@ark-ui/react` 等 |
| **Factory** | 建立可組合的基礎元素 | `factory.ts` |

---

## Monorepo 結構

```
chromosphere/
├── packages/
│   ├── react/                    # React 適配層
│   │   ├── src/
│   │   │   ├── components/       # React 元件（每個元件一個資料夾）
│   │   │   │   ├── accordion/    # 例：Accordion 元件
│   │   │   │   │   ├── accordion.tsx
│   │   │   │   │   ├── accordion-context.ts
│   │   │   │   │   ├── accordion.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── dialog/
│   │   │   │   ├── tabs/
│   │   │   │   ├── anatomy.ts    # 所有元件的 anatomy 統一匯出
│   │   │   │   ├── factory.ts    # 元素工廠函式
│   │   │   │   └── index.ts      # 統一匯出
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── vue/                      # Vue 適配層
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── accordion/
│   │   │   │   │   ├── Accordion.vue
│   │   │   │   │   ├── AccordionItem.vue
│   │   │   │   │   └── index.ts
│   │   │   │   └── ...
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── solid/                    # SolidJS 適配層
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── accordion/
│   │   │   │   │   ├── accordion.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── ...
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── svelte/                   # Svelte 適配層
│       ├── src/
│       │   ├── components/
│       │   │   ├── accordion/
│       │   │   │   ├── Accordion.svelte
│       │   │   │   └── index.ts
│       │   │   └── ...
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── package.json                  # root package.json (workspaces)
├── tsconfig.json                 # 共用 TypeScript 設定
└── README.md
```

---

## 安裝方式

選擇你的框架並安裝對應的套件：

```bash
# React
npm install @chromosphere/react

# Vue
npm install @chromosphere/vue

# Solid
npm install @chromosphere/solid

# Svelte
npm install @chromosphere/svelte
```

---

## 各框架使用範例

以下以 **Dialog** 元件為例，展示各框架的 API 設計目標。
Chromosphere 的 API 設計參照 Ark UI，採用 **Namespace 模式**（`Component.Part`）提供一致的開發者體驗。

### React

```tsx
import { Dialog } from '@chromosphere/react/dialog'

export const MyDialog = () => (
  <Dialog.Root>
    <Dialog.Trigger>開啟 Dialog</Dialog.Trigger>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Dialog 標題</Dialog.Title>
        <Dialog.Description>Dialog 內容描述</Dialog.Description>
        <Dialog.CloseTrigger>關閉</Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
)
```

### Vue

```vue
<script setup lang="ts">
import { Dialog } from '@chromosphere/vue/dialog'
</script>

<template>
  <Dialog.Root>
    <Dialog.Trigger>開啟 Dialog</Dialog.Trigger>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Dialog 標題</Dialog.Title>
        <Dialog.Description>Dialog 內容描述</Dialog.Description>
        <Dialog.CloseTrigger>關閉</Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
</template>
```

### Solid

```tsx
import { Dialog } from '@chromosphere/solid/dialog'

export const MyDialog = () => (
  <Dialog.Root>
    <Dialog.Trigger>開啟 Dialog</Dialog.Trigger>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Dialog 標題</Dialog.Title>
        <Dialog.Description>Dialog 內容描述</Dialog.Description>
        <Dialog.CloseTrigger>關閉</Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
)
```

### Svelte

```svelte
<script lang="ts">
  import { Dialog } from '@chromosphere/svelte/dialog'
</script>

<Dialog.Root>
  <Dialog.Trigger>開啟 Dialog</Dialog.Trigger>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Title>Dialog 標題</Dialog.Title>
      <Dialog.Description>Dialog 內容描述</Dialog.Description>
      <Dialog.CloseTrigger>關閉</Dialog.CloseTrigger>
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
```

### 零樣式自由度

所有元件完全無樣式，你可以自由搭配任何 CSS 方案：

```tsx
// Tailwind CSS
<Dialog.Trigger className="px-4 py-2 bg-blue-500 rounded">開啟</Dialog.Trigger>

// CSS-in-JS
<Dialog.Trigger css={{ padding: '8px 16px', background: 'blue' }}>開啟</Dialog.Trigger>

// Vanilla CSS
<Dialog.Trigger className="my-button">開啟</Dialog.Trigger>
```

---

## 元件清單

以下是規劃中的元件，將以漸進方式逐步實作：

### 🔲 Layout & Navigation

| 元件 | 狀態 | 說明 |
|------|------|------|
| Accordion | ⬜ 待實作 | 手風琴收合面板 |
| Tabs | ⬜ 待實作 | 分頁標籤切換 |
| Collapsible | ⬜ 待實作 | 可收合區塊 |

### 🔲 Overlays & Dialogs

| 元件 | 狀態 | 說明 |
|------|------|------|
| Dialog | ⬜ 待實作 | 對話框 / 彈窗 |
| Popover | ⬜ 待實作 | 彈出式提示 |
| Tooltip | ⬜ 待實作 | 工具提示 |

### 🔲 Forms & Inputs

| 元件 | 狀態 | 說明 |
|------|------|------|
| Checkbox | ⬜ 待實作 | 勾選框 |
| Switch | ⬜ 待實作 | 開關切換 |
| Select | ⬜ 待實作 | 下拉選單 |
| Radio Group | ⬜ 待實作 | 單選組 |

### 🔲 Data Display

| 元件 | 狀態 | 說明 |
|------|------|------|
| Avatar | ⬜ 待實作 | 頭像 |
| Progress | ⬜ 待實作 | 進度條 |

> 💡 建議實作順序：先從簡單的元件（如 `Collapsible`、`Switch`）開始，逐步挑戰複雜元件（如 `Select`、`Dialog`）。

---

## 開發指南

### 前置需求

- Node.js >= 18
- pnpm >= 8 (推薦) 或 npm

### 快速開始

```bash
# 安裝依賴
pnpm install

# 啟動開發模式（以 React 為例）
pnpm --filter @chromosphere/react dev

# 執行測試
pnpm --filter @chromosphere/react test

# 建置所有套件
pnpm build
```

### 新增一個元件的步驟

以新增 `Accordion` 元件為例：

1. **在對應框架的 `components/` 下建立資料夾**
   ```
   packages/react/src/components/accordion/
   ```

2. **建立元件的核心檔案**
   ```
   accordion/
   ├── accordion-root.tsx        # Root 容器元件
   ├── accordion-item.tsx        # 單一項目
   ├── accordion-trigger.tsx     # 觸發器
   ├── accordion-content.tsx     # 內容區
   ├── accordion-context.ts      # Context 定義
   ├── accordion.test.tsx        # 測試
   └── index.ts                  # 統一匯出（建立 namespace）
   ```

3. **定義 namespace 匯出**（`index.ts`）
   ```ts
   export { AccordionRoot as Root } from './accordion-root'
   export { AccordionItem as Item } from './accordion-item'
   export { AccordionTrigger as Trigger } from './accordion-trigger'
   export { AccordionContent as Content } from './accordion-content'
   
   // 也可以使用此方式建立 namespace
   // export const Accordion = { Root, Item, Trigger, Content }
   ```

---

## 設計原則

### 1. Headless (無樣式)
元件只負責**行為與邏輯**，不包含任何預設樣式。消費者完全掌控視覺呈現。

### 2. Composable (可組合)
採用 **Compound Component** 模式，每個元件由多個小部件組成，可自由組合。

### 3. Accessible (無障礙)
所有元件需遵循 [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/) 設計模式：
- 正確的 ARIA 屬性與角色
- 鍵盤導航支援
- 焦點管理
- 螢幕閱讀器支援

### 4. Framework Agnostic Core (框架無關核心)
核心邏輯應獨立於具體框架，各框架的適配層只負責：
- 將核心狀態對接到框架的響應式系統
- 提供符合框架慣例的 API

### 5. Type-Safe (型別安全)
使用 TypeScript 提供完整的型別定義，確保良好的開發者體驗。

---

## 學習筆記

> 💡 這裡是你記錄學習過程中觀察到的 pattern 和 insight 的地方。

### Ark UI 架構觀察

<!-- TODO: 在學習過程中記錄 -->

- [ ] Zag.js 如何使用狀態機管理元件行為？
- [ ] `anatomy` 的作用是什麼？如何定義元件的組成部分？
- [ ] `factory` 模式如何建立基礎的可組合元素？
- [ ] Ark UI 如何實現跨框架的 API 一致性？
- [ ] Context 在 compound component 模式中的角色？

### 實作挑戰紀錄

<!-- TODO: 在實作過程中記錄遇到的挑戰 -->

---

## 參考資源

### 核心參考
- [Ark UI](https://github.com/chakra-ui/ark) — 本專案的主要參考對象
- [Zag.js](https://zagjs.com) — Ark UI 底層的狀態機引擎
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) — 無障礙設計模式

### 類似專案
- [Radix UI](https://www.radix-ui.com/) — React 的 Headless UI 元件庫
- [Headless UI](https://headlessui.com/) — Tailwind Labs 的 Headless 元件
- [Kobalte](https://kobalte.dev/) — SolidJS 的 Headless 元件庫
- [Melt UI](https://melt-ui.com/) — Svelte 的 Headless 元件庫

### 延伸學習
- [XState](https://xstate.js.org/) — JavaScript 狀態機庫
- [Compound Components Pattern](https://www.patterns.dev/react/compound-pattern/) — 複合元件模式
- [Kent C. Dodds - Advanced React Patterns](https://kentcdodds.com/blog/advanced-react-patterns)

---

## License

MIT
# chromosphere
