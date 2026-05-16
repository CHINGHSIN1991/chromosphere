# Ch12：效能優化

## 關鍵知識點

- 元件重渲染（Re-render）的觸發條件
- `React.memo` 的使用時機
- `useMemo` 和 `useCallback` 的正確用法
- Context 分裂（Context Splitting）避免不必要重渲染
- Lazy loading 元件（`React.lazy` + `Suspense`）
- 效能分析工具的使用

---

## 1. 重渲染的根本原因

在實作 Accordion 時，最容易遇到的效能問題是：

> **更新一個 Item 的展開狀態，導致所有 Item 都重渲染**

### 問題模型

```
AccordionRoot（state: value = ['item-1']）
  ├── AccordionItem value="item-1"  ← 展開
  ├── AccordionItem value="item-2"  ← 收合（不需要重渲染！）
  └── AccordionItem value="item-3"  ← 收合（不需要重渲染！）
```

當使用者點擊 `item-2`，`value` 變成 `['item-1', 'item-2']`：
- `AccordionRoot` 重渲染 ✓
- `AccordionItem item-1` 重渲染 ← 不必要！它的狀態沒變
- `AccordionItem item-2` 重渲染 ✓
- `AccordionItem item-3` 重渲染 ← 不必要！

---

## 2. Context 分裂（Context Splitting）

Context 的問題：一旦 Context value 改變，**所有消費這個 Context 的元件都會重渲染**。

### 解決方案：把頻繁變化的狀態和穩定的值分開

```typescript
// ❌ 一個 Context 包含所有東西
const AccordionContext = createContext({
  value: string[],          // 頻繁變化
  setValue: Function,       // 穩定（引用不變）
  multiple: boolean,        // 從不變化
})
// value 變化時，所有消費者都重渲染

// ✅ 分成兩個 Context
const AccordionStateContext = createContext({
  value: string[],          // 只有需要讀狀態的元件訂閱
})
const AccordionActionsContext = createContext({
  setValue: Function,       // 只有需要更新的元件訂閱
  multiple: boolean,
})
```

這樣，`AccordionItemContent`（只需要讀 `value`）和 `AccordionItemTrigger`（需要調用 `setValue`）可以分別訂閱不同的 Context，不會互相影響。

---

## 3. `React.memo`

`React.memo` 讓元件在 props 沒有改變時跳過重渲染：

```tsx
// 沒有 memo：每次父元件重渲染，子元件也重渲染
const AccordionItem = ({ value, children }) => { ... }

// 有 memo：只有 props 實際改變時才重渲染
const AccordionItem = React.memo(({ value, children }) => { ... })
```

### 搭配 `forwardRef` 使用

```tsx
const AccordionItem = React.memo(
  forwardRef<HTMLDivElement, AccordionItemProps>((props, ref) => {
    // ...
  })
)
AccordionItem.displayName = 'AccordionItem'
```

### 什麼時候用 `React.memo`？

```
✅ 適合：
- 元件渲染成本高（複雜計算、大型 DOM 樹）
- props 很少改變
- 元件在同一個高頻渲染的父元件下

❌ 不適合：
- 簡單元件（memo 的比較成本可能大於節省的成本）
- props 每次都會改變（如傳入內聯函式）
- 過早優化（先測量再優化）
```

---

## 4. `useCallback` 和 `useMemo`

### `useCallback`：穩定函式的引用

Context 的 `setValue` 如果是在 render 中建立的，每次都是新函式，會破壞 `memo`：

```tsx
// ❌ 每次渲染都是新函式 → 破壞子元件的 memo
const setValue = (newValue: string[]) => { ... }

// ✅ 穩定的函式引用
const setValue = useCallback((newValue: string[]) => {
  setInternalValue(newValue)
  onValueChange?.(newValue)
}, [onValueChange])  // 只在 onValueChange 改變時重建
```

### `useMemo`：穩定物件的引用

Context value 物件每次都是新的（即使內容沒變）：

```tsx
// ❌ 每次渲染都是新物件 → 所有 Context 消費者重渲染
<AccordionContext.Provider value={{ value, setValue, multiple }}>

// ✅ 只在內容改變時建立新物件
const contextValue = useMemo(
  () => ({ value, setValue, multiple }),
  [value, setValue, multiple]
)
<AccordionContext.Provider value={contextValue}>
```

---

## 5. `React.lazy` 和 `Suspense`

對於大型元件（如 Dialog、Select），可以使用懶加載：

```tsx
// 懶加載：只有用到時才下載 JS
const Dialog = React.lazy(() => import('@chromosphere/react/dialog'))

// 使用 Suspense 包裝
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dialog.Root>
        ...
      </Dialog.Root>
    </Suspense>
  )
}
```

在 Vite/Rollup 中，這會自動做 code splitting，把 Dialog 的程式碼打包到獨立的 chunk。

---

## 6. 效能測量工具

### React DevTools Profiler

1. 安裝 React DevTools 瀏覽器擴充
2. 打開 Profiler 分頁
3. 點擊 "Record"
4. 進行操作（如點擊 Accordion trigger）
5. 停止錄製，查看哪些元件重渲染了

### `why-did-you-render`

自動偵測不必要的重渲染：

```bash
pnpm add -D @welldone-software/why-did-you-render
```

```typescript
// src/wdyr.ts（開發環境）
import React from 'react'
import whyDidYouRender from '@welldone-software/why-did-you-render'

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  })
}
```

---

## 7. Solid 和 Vue 的天然優勢

React 需要手動優化（`memo`、`useCallback`），而 SolidJS 和 Vue 有**天然的細粒度反應式**：

```typescript
// SolidJS：只有訂閱了 value 的地方才會更新
// 不需要 memo，因為 Solid 不重渲染整個元件
const isExpanded = createMemo(() =>
  expandedValues().includes(itemValue)
)
```

這是 Solid 最大的效能優勢之一。

---

## 練習

1. 用 React DevTools Profiler 錄製展開 Accordion 的操作，觀察哪些元件重渲染了
2. 在 `AccordionItem` 加上 `React.memo`，對比前後的重渲染次數
3. 把 AccordionContext 分成 State 和 Actions 兩個 Context，確認 Content 不再無謂重渲染
4. 使用 `useMemo` 穩定 Context value 物件

---

## 延伸閱讀

- [React 效能優化](https://react.dev/learn/render-and-commit)
- [React.memo](https://react.dev/reference/react/memo)
- [useMemo](https://react.dev/reference/react/useMemo)
- [useCallback](https://react.dev/reference/react/useCallback)
- [SolidJS 效能](https://www.solidjs.com/guides/reactivity#fine-grained-reactivity)
