# Ch05：React 元件設計

## 關鍵知識點

- `forwardRef` 的用途與模式
- `ComponentPropsWithoutRef` vs `HTMLAttributes`
- 元件組合（Composition）vs 繼承
- 每個 Accordion part 的職責劃分
- `displayName` 的作用
- HTML props 的擴展與覆寫

---

## 1. `forwardRef` 模式

### 為什麼需要 `forwardRef`？

React 函式元件**不會自動轉發 `ref`**。如果使用者想要直接操作 DOM 節點（例如聚焦、測量尺寸），就需要 `forwardRef`：

```tsx
// 沒有 forwardRef：ref 無法傳入
function AccordionRoot(props) {
  return <div {...props} />
}

const ref = useRef<HTMLDivElement>(null)
<AccordionRoot ref={ref} />  // ❌ ref 無效
```

```tsx
// 有 forwardRef：ref 正確傳入
const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(
  (props, ref) => {
    return <div ref={ref} {...props} />
  }
)

const ref = useRef<HTMLDivElement>(null)
<AccordionRoot ref={ref} />  // ✅ ref 指向 <div>
```

### `forwardRef` 的型別參數

```typescript
forwardRef<T, P>(render: (props: P, ref: Ref<T>) => ReactElement)
// T = DOM 元素型別（如 HTMLDivElement）
// P = 元件的 Props 型別
```

---

## 2. `ComponentPropsWithoutRef`

### 為什麼用這個？

讓元件自動繼承對應 HTML 元素的所有原生屬性：

```typescript
import type { ComponentPropsWithoutRef } from 'react'

// 繼承 <div> 的所有屬性（className、style、onClick、id...）
// 但不包含 ref（因為 forwardRef 會另外處理）
interface AccordionRootProps extends ComponentPropsWithoutRef<'div'> {
  defaultValue?: string[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  disabled?: boolean
}
```

這樣使用者可以直接傳任何 HTML `<div>` 屬性：

```tsx
<Accordion.Root
  className="my-accordion"
  style={{ padding: '1rem' }}
  aria-label="常見問題"
  data-testid="faq-accordion"
  // ↑ 這些都被 ComponentPropsWithoutRef<'div'> 涵蓋了
  defaultValue={['item-1']}
  // ↑ 這是自訂的 prop
/>
```

### `WithoutRef` vs `WithRef`

```typescript
// ComponentPropsWithoutRef：不含 ref，搭配 forwardRef 使用
interface Props extends ComponentPropsWithoutRef<'button'> { }

// ComponentPropsWithRef：含 ref（較少用）
interface Props extends ComponentPropsWithRef<'button'> { }
```

---

## 3. 各 Accordion Part 的職責

### AccordionRoot

**職責：**
1. 接受 `defaultValue`、`value`、`onValueChange`、`multiple` props
2. 管理 `value: string[]` 的狀態（受控/非受控）
3. 渲染 `AccordionContext.Provider` 把狀態傳給子元件
4. 渲染 `<div>` 容器

```tsx
const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(
  ({ children, defaultValue, value, onValueChange, multiple = false, ...htmlProps }, ref) => {
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue ?? [])
    const currentValue = value !== undefined ? value : internalValue

    const setValue = (newValue: string[]) => {
      setInternalValue(newValue)
      onValueChange?.(newValue)
    }

    return (
      <AccordionContext.Provider value={{ value: currentValue, setValue, multiple }}>
        <div ref={ref} {...htmlProps}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)
```

### AccordionItem

**職責：**
1. 接受 `value` prop（這個 item 的唯一識別）
2. 從 `AccordionContext` 讀取當前展開的 values
3. 計算自己是否展開（`isExpanded = expandedValues.includes(itemValue)`）
4. 建立 `AccordionItemContext` 供子元件使用
5. 渲染 `<div>` 並加上 `data-state`

```tsx
const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value: itemValue, disabled, children, ...htmlProps }, ref) => {
    const { value: expandedValues } = useAccordionContext()
    const isExpanded = expandedValues.includes(itemValue)

    return (
      <AccordionItemContext.Provider value={{ itemValue, isExpanded, isDisabled: disabled ?? false }}>
        <div
          ref={ref}
          data-part="item"
          data-state={isExpanded ? 'open' : 'closed'}
          {...(disabled && { 'data-disabled': '' })}
          {...htmlProps}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  }
)
```

### AccordionItemTrigger

**職責：**
1. 從兩個 Context 讀取資訊
2. 實作點擊切換邏輯（考慮 `multiple` 設定）
3. 加上完整的 ARIA 屬性（`aria-expanded`、`aria-controls`）
4. 渲染 `<button>` 並保留原有事件處理

```tsx
const AccordionItemTrigger = forwardRef<HTMLButtonElement, AccordionItemTriggerProps>(
  ({ onClick, children, ...htmlProps }, ref) => {
    const { value, setValue, multiple } = useAccordionContext()
    const { itemValue, isExpanded, isDisabled, contentId } = useAccordionItemContext()

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)  // ← 保留使用者的 onClick
      if (isDisabled) return

      if (isExpanded) {
        setValue(value.filter(v => v !== itemValue))
      } else {
        setValue(multiple ? [...value, itemValue] : [itemValue])
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        data-part="item-trigger"
        aria-expanded={isExpanded}
        aria-controls={contentId}
        disabled={isDisabled}
        onClick={handleClick}
        {...htmlProps}
      >
        {children}
      </button>
    )
  }
)
```

### AccordionItemContent

**職責：**
1. 從 Item Context 讀取展開狀態
2. 渲染 `<div>` 並加上 `data-state`
3. 加上 ARIA id（供 Trigger 的 `aria-controls` 使用）

```tsx
const AccordionItemContent = forwardRef<HTMLDivElement, AccordionItemContentProps>(
  (props, ref) => {
    const { isExpanded, contentId } = useAccordionItemContext()

    return (
      <div
        ref={ref}
        id={contentId}
        data-part="item-content"
        data-state={isExpanded ? 'open' : 'closed'}
        hidden={!isExpanded}
        {...props}
      />
    )
  }
)
```

---

## 4. `displayName` 的重要性

```typescript
AccordionRoot.displayName = 'AccordionRoot'
```

**為什麼要設定？**

1. **React DevTools**：在 DevTools 中顯示正確的元件名稱，而不是 `Anonymous` 或 `ForwardRef`
2. **錯誤訊息**：React 的錯誤訊息中會顯示元件名稱
3. **測試**：某些測試工具依賴 `displayName` 識別元件

用 `forwardRef` 或高階元件包裝後，元件名稱容易丟失，所以要明確設定。

---

## 5. HTML Props 的三種情況

### 擴展（加入新 props）
```typescript
interface MyProps extends ComponentPropsWithoutRef<'div'> {
  isOpen?: boolean  // 加入新 prop
}
```

### 覆寫（改變現有 prop 的型別）
```typescript
interface MyProps extends Omit<ComponentPropsWithoutRef<'input'>, 'onChange'> {
  onChange?: (value: string) => void  // 覆寫原本的 onChange
}
```

### 限制（不想讓使用者傳某些 prop）
```typescript
// 不讓使用者覆寫 type（固定為 'button'）
interface ButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'type'> { }
```

---

## 練習

1. 打開 [`packages/react/src/components/accordion/accordion-root.tsx`](packages/react/src/components/accordion/accordion-root.tsx)，根據 TODO 提示實作 Root
2. 打開 [`packages/react/src/components/accordion/accordion-item.tsx`](packages/react/src/components/accordion/accordion-item.tsx)，實作 Item
3. 打開 [`packages/react/src/components/accordion/accordion-item-trigger.tsx`](packages/react/src/components/accordion/accordion-item-trigger.tsx)，實作 Trigger（最複雜）
4. 打開 [`packages/react/src/components/accordion/accordion-item-content.tsx`](packages/react/src/components/accordion/accordion-item-content.tsx)，實作 Content

**實作後測試：** 在 playground 中使用你實作的元件，確認基本功能運作。

---

## 延伸閱讀

- [React forwardRef](https://react.dev/reference/react/forwardRef)
- [ComponentPropsWithoutRef](https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring-a-html-element)
- [Ark UI Accordion 實作](https://github.com/chakra-ui/ark/tree/main/packages/react/src/components/accordion)
