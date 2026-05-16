# Ch02：Core 型別系統

## 關鍵知識點

- `@chromosphere/core` 的角色與設計原則
- `AccordionContextValue`、`AccordionRootBaseProps` 介面的意義
- TypeScript `interface` vs `type` 的選擇
- `as const` 的用途
- 為什麼要把型別與實作分開

---

## 1. Core Package 的角色

`packages/core/src/` 是整個元件庫的**規格書**。

它回答的問題是：
> 「不管用什麼框架，一個 Accordion 元件應該有什麼狀態？接受什麼 props？有哪些組成部分？」

框架 package（react/vue/solid/svelte）再根據這份規格實作自己的版本。

---

## 2. 以 Accordion 為例

檔案位置：[`packages/core/src/components/accordion/types.ts`](packages/core/src/components/accordion/types.ts)

### 2.1 Anatomy 型別

```typescript
export type AccordionPart = 'root' | 'item' | 'item-trigger' | 'item-content'
```

`AccordionPart` 是一個 **union type**，列舉了這個元件的所有組成部分（parts）。

- `root` — 最外層容器
- `item` — 單一手風琴項目
- `item-trigger` — 點擊觸發展開的按鈕
- `item-content` — 可收合的內容區域

> 💡 這對應到 HTML 結構：
> ```html
> <div data-part="root">          <!-- root -->
>   <div data-part="item">        <!-- item -->
>     <button data-part="item-trigger">標題</button>
>     <div data-part="item-content">內容</div>
>   </div>
> </div>
> ```

### 2.2 Context 介面

```typescript
export interface AccordionContextValue {
  /** 目前展開的 item 值陣列 */
  value: string[]
  /** 更新展開狀態 */
  setValue: (value: string[]) => void
  /** 是否允許同時展開多個 item */
  multiple: boolean
}
```

這個介面定義了 Accordion 元件**共享狀態**的形狀。

- `value: string[]` — 為什麼是陣列？因為可能允許多個 item 同時展開
- `setValue` — 更新函式，每個框架的實作不同（React 的 `setState`、Solid 的 signal setter 等）
- `multiple` — 決定行為的旗標

### 2.3 Root Props 介面

```typescript
export interface AccordionRootBaseProps {
  defaultValue?: unknown
  value?: unknown
  onValueChange?: (value: unknown) => void
  disabled?: boolean
}
```

注意用的是 `unknown` 而非具體型別：
- React 版本的 `value` 是 `string[]`
- 但 Core 只定義「有這個 prop」，具體型別由各框架 package 決定

### 2.4 Anatomy 常數

```typescript
export const ACCORDION_ANATOMY = {
  ROOT: 'div' as const,
  ITEM: 'div' as const,
  ITEM_TRIGGER: 'button' as const,
  ITEM_CONTENT: 'div' as const,
} as const
```

**`as const` 的作用：**
```typescript
// 沒有 as const：
const x = { ROOT: 'div' }
// x.ROOT 的型別是 string（太寬鬆）

// 有 as const：
const x = { ROOT: 'div' } as const
// x.ROOT 的型別是 'div'（精確的字面量型別）
```

這讓 TypeScript 知道 `ACCORDION_ANATOMY.ITEM_TRIGGER` 一定是 `'button'`，不是任意字串。

---

## 3. 為什麼不直接寫在 React package 裡？

### 問題：如果只有 React package

```typescript
// packages/react/src/components/accordion/types.ts
export interface AccordionContextValue {
  value: string[]
  setValue: React.Dispatch<React.SetStateAction<string[]>>  // ← React 特定！
  multiple: boolean
}
```

Vue 或 Solid 的開發者就沒辦法重用這個型別。

### 解決方案：抽離到 Core

```typescript
// packages/core/src/components/accordion/types.ts
export interface AccordionContextValue {
  value: string[]
  setValue: (value: string[]) => void  // ← 框架無關的函式簽名
  multiple: boolean
}
```

現在 React、Vue、Solid、Svelte 都可以 `implements` 或參考這個介面。

---

## 4. 各元件的 Core 型別

`packages/core/src/` 目前包含 11 個元件的型別：

| 元件 | 檔案 | 特別之處 |
|------|------|---------|
| accordion | `accordion/types.ts` | 雙層 Context（Root + Item） |
| avatar | `avatar/types.ts` | 圖片載入狀態管理 |
| checkbox | `checkbox/types.ts` | indeterminate 第三態 |
| dialog | `dialog/types.ts` | Portal 渲染到 body |
| popover | `popover/types.ts` | 需要定位邏輯（floating-ui） |
| progress | `progress/types.ts` | min/max/value 數值型別 |
| radio-group | `radio-group/types.ts` | 群組中的單選邏輯 |
| select | `select/types.ts` | 最複雜（含 item-group） |
| switch | `switch/types.ts` | 類似 checkbox 但語意不同 |
| tabs | `tabs/types.ts` | 需要 Panel/Trigger 對應關係 |
| tooltip | `tooltip/types.ts` | hover delay 狀態 |

---

## 5. TypeScript 重點：`interface` vs `type`

在這個 repo 中：
- **`interface`** 用於描述物件形狀（`AccordionContextValue`、`AccordionRootBaseProps`）
- **`type`** 用於聯合型別（`AccordionPart = 'root' | 'item' | ...`）

這是業界常見的慣例：
- `interface` 可以被 `extends` 繼承，適合做規格
- `type` 更靈活，適合做映射和聯合

---

## 練習

1. 打開 [`packages/core/src/components/accordion/types.ts`](packages/core/src/components/accordion/types.ts)，閱讀所有定義
2. 思考：`AccordionContextValue` 中的 `setValue` 為什麼不寫 `React.Dispatch<...>`？
3. 打開 [`packages/core/src/components/tabs/types.ts`](packages/core/src/components/tabs/types.ts)，比較 Tabs 和 Accordion 的 Context 差異
4. 試著把 `ACCORDION_ANATOMY` 的 `as const` 移除，觀察型別推斷的變化

---

## 延伸閱讀

- [TypeScript Handbook: Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
- [TypeScript `as const`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)
- [Zag.js 核心型別設計](https://zagjs.com/overview/introduction)
