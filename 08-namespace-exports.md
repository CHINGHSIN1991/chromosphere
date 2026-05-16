# Ch08：Namespace 匯出模式

## 關鍵知識點

- `accordion.ts` 的 Namespace 物件設計
- `index.ts` 的兩種匯出策略
- 為什麼要用 `<Accordion.Root>` 而不是 `<AccordionRoot>`
- TypeScript namespace vs 物件的差異
- 樹搖（Tree Shaking）的考量

---

## 1. Namespace 匯出是什麼？

Namespace 匯出讓使用者可以用**點記法**使用元件：

```tsx
import { Accordion } from '@chromosphere/react'

// Namespace 用法
<Accordion.Root>
  <Accordion.Item value="item-1">
    <Accordion.ItemTrigger>標題</Accordion.ItemTrigger>
    <Accordion.ItemContent>內容</Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>
```

vs 具名匯出：

```tsx
import { AccordionRoot, AccordionItem, AccordionItemTrigger, AccordionItemContent } from '@chromosphere/react'

// 具名匯出用法
<AccordionRoot>
  <AccordionItem value="item-1">
    <AccordionItemTrigger>標題</AccordionItemTrigger>
    <AccordionItemContent>內容</AccordionItemContent>
  </AccordionRoot>
```

---

## 2. `accordion.ts` 的設計

檔案位置：[`packages/react/src/components/accordion/accordion.ts`](packages/react/src/components/accordion/accordion.ts)

這個檔案建立 `Accordion` namespace 物件：

```typescript
import { AccordionRoot } from './accordion-root'
import { AccordionItem } from './accordion-item'
import { AccordionItemTrigger } from './accordion-item-trigger'
import { AccordionItemContent } from './accordion-item-content'

// 建立 namespace 物件
export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  ItemTrigger: AccordionItemTrigger,
  ItemContent: AccordionItemContent,
}

// 也可以匯出各元件的 Props 型別
export type { AccordionRootProps } from './accordion-root'
export type { AccordionItemProps } from './accordion-item'
export type { AccordionItemTriggerProps } from './accordion-item-trigger'
export type { AccordionItemContentProps } from './accordion-item-content'
```

---

## 3. `index.ts` 的兩種匯出

檔案位置：[`packages/react/src/components/accordion/index.ts`](packages/react/src/components/accordion/index.ts)

同時提供**具名匯出**和 **Namespace 匯出**，讓使用者自由選擇：

```typescript
// 具名匯出（單獨引用各元件）
export { AccordionRoot } from './accordion-root'
export { AccordionItem } from './accordion-item'
export { AccordionItemTrigger } from './accordion-item-trigger'
export { AccordionItemContent } from './accordion-item-content'

// Namespace 匯出（整包引用）
export { Accordion } from './accordion'
export type { AccordionRootProps, AccordionItemProps, ... } from './accordion'
```

使用者可以根據偏好選擇：

```tsx
// 選擇一：Namespace（程式碼較清晰，知道每個元件屬於哪個元件族）
import { Accordion } from '@chromosphere/react'
<Accordion.Root>...</Accordion.Root>

// 選擇二：具名匯出（可以 tree-shake，且名字更短）
import { AccordionRoot, AccordionItem } from '@chromosphere/react'
<AccordionRoot>...</AccordionRoot>
```

---

## 4. 為什麼用 Namespace？

### 優點

**1. 語意清晰**

```tsx
// ✅ 一看就知道 Root、Item 屬於 Accordion
<Accordion.Root>
  <Accordion.Item>
    <Accordion.ItemTrigger>

// vs. 如果有多個元件庫，名字可能衝突：
// TabsRoot? SelectRoot? DialogRoot? 哪個 Root？
```

**2. 自動補全友善**

輸入 `Accordion.` 後，IDE 會列出所有 `Accordion` 的子元件，不需要記住每個元件的完整名稱。

**3. 一行匯入**

```tsx
// 一個 import 就取得整個元件族
import { Accordion } from '@chromosphere/react'
// vs. 具名匯出需要列舉每個元件
import { AccordionRoot, AccordionItem, AccordionItemTrigger, AccordionItemContent } from '@chromosphere/react'
```

### 缺點

**1. Tree Shaking 稍差**

某些打包工具在 namespace 物件上的 tree shaking 不如具名匯出精確，但現代工具（Rollup、Vite）通常都能處理。

---

## 5. TypeScript namespace vs 物件

TypeScript 有兩種「namespace」概念：

### TypeScript `namespace` 關鍵字（不推薦）

```typescript
// TypeScript namespace（舊式，不推薦）
namespace Accordion {
  export const Root = AccordionRoot
  export const Item = AccordionItem
}
```

這是 TypeScript 特有的語法，在現代 ES modules 中不常使用。

### 普通物件（推薦）

```typescript
// 普通 JavaScript 物件（推薦）
export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
}
```

這是目前業界（Radix UI、Ark UI）的標準做法。純 JavaScript，不依賴 TypeScript 特殊語法。

---

## 6. 頂層 `index.ts` 的組織

檔案位置：[`packages/react/src/index.ts`](packages/react/src/index.ts)

這是整個 `@chromosphere/react` 套件的入口點：

```typescript
// 匯出所有已完成的元件
export * from './components/accordion'
export * from './components/tabs'
export * from './components/dialog'
// ...等所有元件

// 或者，明確列出每個元件的 namespace：
export { Accordion } from './components/accordion'
export { Tabs } from './components/tabs'
export { Dialog } from './components/dialog'
```

---

## 7. 實際使用範例

```tsx
// 完整範例
import { Accordion } from '@chromosphere/react'
import type { AccordionRootProps } from '@chromosphere/react'

function FAQ() {
  return (
    <Accordion.Root defaultValue={['q1']} multiple>
      <Accordion.Item value="q1">
        <Accordion.ItemTrigger>問題一</Accordion.ItemTrigger>
        <Accordion.ItemContent>答案一</Accordion.ItemContent>
      </Accordion.Item>

      <Accordion.Item value="q2">
        <Accordion.ItemTrigger>問題二</Accordion.ItemTrigger>
        <Accordion.ItemContent>答案二</Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}
```

---

## 練習

1. 打開 [`packages/react/src/components/accordion/accordion.ts`](packages/react/src/components/accordion/accordion.ts)，查看 Namespace 物件的實作
2. 打開 [`packages/react/src/components/accordion/index.ts`](packages/react/src/components/accordion/index.ts)，觀察兩種匯出策略
3. 在 playground 中嘗試兩種匯入方式（Namespace 和具名），確認都可以運作
4. 思考：如果要讓 `Accordion` 的 type 可以被使用者擴充（custom props），namespace 模式應該怎麼設計？

---

## 延伸閱讀

- [Radix UI 的 namespace 做法](https://github.com/radix-ui/primitives/blob/main/packages/react/accordion/src/index.ts)
- [ES Module Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
- [TypeScript Module System](https://www.typescriptlang.org/docs/handbook/modules.html)
