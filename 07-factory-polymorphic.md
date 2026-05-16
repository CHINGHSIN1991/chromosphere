# Ch07：Factory 與 Polymorphic 元件

## 關鍵知識點

- `factory.ts` 的設計目的
- Polymorphic Component（多態元件）的概念與 `as` prop
- `asChild` 模式與 Slot 模式
- Radix UI `Slot` 的工作原理
- TypeScript 對 polymorphic 元件的型別挑戰
- `createElement` 的直接使用

---

## 1. 為什麼需要 Factory？

### 沒有 Factory 的做法

每個元件都要手動寫 `forwardRef`：

```tsx
// AccordionRoot
const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(
  (props, ref) => <div ref={ref} {...props} />
)

// AccordionItem
const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (props, ref) => <div ref={ref} {...props} />
)
```

如果有 50 個元件，每個都有 `div`、`button`、`span`...，這很重複。

### Factory 的做法

```typescript
// 從 factory 建立基礎元素
import { ark } from '../factory'

// 在元件中使用 ark.div 代替 <div>
const AccordionRoot = forwardRef((props, ref) => (
  <ark.div ref={ref} data-part="root" {...props} />
))
```

---

## 2. `factory.ts` 的設計

檔案位置：[`packages/react/src/components/factory.ts`](packages/react/src/components/factory.ts)

`factory.ts` 的目標是建立一個 `ark` 物件，包含常用 HTML 元素的包裝版本：

```typescript
export const ark = {
  div: createArkComponent('div'),
  button: createArkComponent('button'),
  span: createArkComponent('span'),
  input: createArkComponent('input'),
  label: createArkComponent('label'),
  // ...
}
```

每個 `ark.div` 都是一個支援特殊 props（如 `as`、`asChild`）的 React 元件。

---

## 3. Polymorphic Component（`as` prop）

### 概念

允許使用者改變元件渲染的 HTML 標籤：

```tsx
// 預設渲染 <div>
<ark.div>Hello</ark.div>
// → <div>Hello</div>

// 改成渲染 <section>
<ark.div as="section">Hello</ark.div>
// → <section>Hello</section>

// 改成渲染另一個元件
<ark.div as={Link} href="/home">Go Home</ark.div>
// → <Link href="/home">Go Home</Link>
```

### 實作原理

```typescript
type ArkProps<T extends ElementType> = {
  as?: T
} & ComponentPropsWithoutRef<T>

function createArkComponent<DefaultTag extends ElementType>(defaultTag: DefaultTag) {
  const ArkComponent = forwardRef<unknown, ArkProps<DefaultTag>>((props, ref) => {
    const { as: As = defaultTag, ...rest } = props
    return createElement(As, { ref, ...rest })
  })
  ArkComponent.displayName = `ark.${String(defaultTag)}`
  return ArkComponent
}
```

### TypeScript 型別挑戰

Polymorphic component 的型別推斷很複雜：

```typescript
// 當 as="button" 時，應該允許 type="submit"
<ark.div as="button" type="submit">送出</ark.div>  // ✅

// 當 as="div" 時，不應該允許 type="submit"
<ark.div type="submit">...</ark.div>  // ❌ 型別錯誤
```

完整的型別安全實作需要進階 TypeScript 泛型技巧（見延伸閱讀）。

---

## 4. `asChild` 模式（Slot 模式）

### 問題：不必要的 DOM 節點

```tsx
// 我想讓 AccordionItemTrigger 的樣式套用到一個 <a> 連結上
// 但這樣會產生多餘的 DOM 節點：
<AccordionItemTrigger>     {/* 渲染 <button> */}
  <a href="...">           {/* 再渲染 <a> */}
    連結
  </a>
</AccordionItemTrigger>
// HTML 結果：<button><a href="...">連結</a></button>
// ❌ <button> 裡不能放 <a>，這是無效的 HTML
```

### 解決方案：`asChild` prop

```tsx
// asChild 讓元件把自己的 props 合併到子元件上，不新增 DOM 節點
<AccordionItemTrigger asChild>
  <a href="...">連結</a>
</AccordionItemTrigger>
// HTML 結果：<a href="..." aria-expanded="false" ...>連結</a>
// ✅ 正確：props 合併到 <a> 上，沒有多餘的 <button>
```

### Radix UI Slot 的工作原理

`asChild` 的實作核心是 `Slot` 元件：

```tsx
// 簡化版 Slot 實作
function Slot({ children, ...slotProps }) {
  // 取出子元素
  const child = React.Children.only(children)

  // 把 slotProps 合併到子元素的 props 上
  return React.cloneElement(child, mergeProps(slotProps, child.props))
}

function mergeProps(slotProps, childProps) {
  return {
    ...slotProps,
    ...childProps,
    // 事件處理需要特別合併（不能直接覆蓋）
    onClick: composeEventHandlers(slotProps.onClick, childProps.onClick),
    // className 可以合併
    className: [slotProps.className, childProps.className].filter(Boolean).join(' '),
  }
}
```

### 在元件中使用 `asChild`

```tsx
const AccordionItemTrigger = forwardRef<HTMLButtonElement, AccordionItemTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp ref={ref} {...props}>
        {children}
      </Comp>
    )
  }
)
```

---

## 5. `as` vs `asChild` 的選擇

| 場景 | 推薦用法 |
|------|---------|
| 只是換一個 HTML 標籤（`div` → `section`） | `as` prop |
| 要把 props 合併到現有的元件/元素上 | `asChild` prop |
| 搭配 React Router 的 `<Link>` | `asChild` prop |
| 搭配 Next.js 的 `<Link>` | `asChild` prop |

```tsx
// asChild + React Router Link
<AccordionItemTrigger asChild>
  <Link to="/page">Navigate</Link>
</AccordionItemTrigger>

// 結果：<a href="/page" aria-expanded="false" ...>Navigate</a>
// 所有 trigger 的 props 都合併到 Link 上了
```

---

## 6. `createElement` 直接使用

在 factory 的實作中，使用 `createElement` 而不是 JSX：

```typescript
// JSX 版本（需要編譯器轉換）
return <As ref={ref} {...rest} />

// createElement 版本（純 JavaScript）
return createElement(As, { ref, ...rest })
```

在工具函式（如 factory.ts）中，有時用 `createElement` 更明確，避免 JSX 編譯設定的干擾。

---

## 練習

1. 打開 [`packages/react/src/components/factory.ts`](packages/react/src/components/factory.ts)，根據 TODO 提示實作 `ark` 物件
2. 實作 `createArkComponent` 函式，先不考慮 `asChild`
3. 進階：加入 `asChild` 支援（需要實作 `Slot` 或使用 `@radix-ui/react-slot`）
4. 在 AccordionItemTrigger 中使用 `ark.button` 替代直接的 `<button>`

---

## 延伸閱讀

- [Radix UI Slot](https://www.radix-ui.com/primitives/docs/utilities/slot)
- [Ark UI factory 實作](https://github.com/chakra-ui/ark/blob/main/packages/react/src/utils/factory.tsx)
- [Polymorphic Components in TypeScript](https://www.freecodecamp.org/news/build-strongly-typed-polymorphic-components-with-react-and-typescript/)
- [React createElement](https://react.dev/reference/react/createElement)
