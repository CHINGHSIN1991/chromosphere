# Ch04：React Context 模式

## 關鍵知識點

- `createContext` / `useContext` 的用法與陷阱
- 防護性 hook（Guard Hook）設計
- 受控（Controlled）vs 非受控（Uncontrolled）模式
- Accordion 的**兩層 Context** 設計
- `null` 作為 Context 預設值的意義

---

## 1. 為什麼需要 Context？

Accordion 的元件結構是巢狀的：

```
AccordionRoot        ← 管理「哪些 item 展開了」的狀態
  └── AccordionItem        ← 需要知道「自己展開了嗎？」
        ├── AccordionItemTrigger   ← 需要能「切換展開狀態」
        └── AccordionItemContent  ← 需要知道「是否應該顯示？」
```

如果用 props 傳遞，就會變成「props drilling」：

```tsx
// 😱 Props Drilling：每層都要手動傳遞
<AccordionRoot value={value} setValue={setValue}>
  <AccordionItem value={value} setValue={setValue} itemValue="item-1">
    <AccordionItemTrigger value={value} setValue={setValue} itemValue="item-1" />
    <AccordionItemContent value={value} itemValue="item-1" />
  </AccordionItem>
</AccordionRoot>
```

用 Context 可以讓子元件直接存取需要的狀態：

```tsx
// ✅ Context：子元件直接取用
<AccordionRoot>          {/* 建立 Context */}
  <AccordionItem value="item-1">    {/* 建立第二層 Context */}
    <AccordionItemTrigger />        {/* 從 Context 讀取 */}
    <AccordionItemContent />        {/* 從 Context 讀取 */}
  </AccordionItem>
</AccordionRoot>
```

---

## 2. 基本 Context 實作模式

檔案位置：[`packages/react/src/components/accordion/accordion-context.ts`](packages/react/src/components/accordion/accordion-context.ts)

### Step 1：定義 Context 的型別

```typescript
import { createContext, useContext } from 'react'

export interface AccordionContextValue {
  value: string[]
  setValue: (value: string[]) => void
  multiple: boolean
}
```

### Step 2：建立 Context

```typescript
// 預設值設為 null：表示「還沒有 Provider」
export const AccordionContext = createContext<AccordionContextValue | null>(null)
```

> 💡 為什麼預設值是 `null` 而不是 `{}`？
>
> `null` 讓我們可以在 hook 中**偵測是否在 Provider 外使用**，進而給出有意義的錯誤訊息。

### Step 3：建立防護性 hook

```typescript
export function useAccordionContext(): AccordionContextValue {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error(
      'useAccordionContext must be used within <Accordion.Root>'
    )
  }
  return context
}
```

**防護性 hook 的優點：**
- 使用者忘記放 `<Accordion.Root>` 時，得到清楚的錯誤訊息
- 呼叫端不需要處理 `null` 檢查
- 回傳型別是 `AccordionContextValue`（非 nullable）

---

## 3. 受控 vs 非受控模式

這是 React 元件設計的核心概念之一。

### 非受控模式（Uncontrolled）

元件**自己管理狀態**，外部不介入：

```tsx
// 使用者這樣用
<AccordionRoot defaultValue={['item-1']}>
  ...
</AccordionRoot>

// 內部實作：
const [internalValue, setInternalValue] = useState(defaultValue ?? [])
```

### 受控模式（Controlled）

**外部完全控制狀態**，元件只負責通知外部：

```tsx
// 使用者這樣用
const [value, setValue] = useState(['item-1'])
<AccordionRoot value={value} onValueChange={setValue}>
  ...
</AccordionRoot>

// 內部實作：
// 用外部傳入的 value，不使用內部 state
const currentValue = value ?? internalValue
```

### 同時支援兩種模式（最佳實踐）

```typescript
// AccordionRoot 內部邏輯
const [internalValue, setInternalValue] = useState<string[]>(
  defaultValue ?? []
)

// 如果外部傳了 value，使用外部的（受控）
// 否則使用內部的（非受控）
const currentValue = value !== undefined ? value : internalValue

const handleChange = (newValue: string[]) => {
  setInternalValue(newValue)        // 更新內部狀態（非受控模式用）
  onValueChange?.(newValue)         // 通知外部（受控模式用）
}
```

---

## 4. Accordion 的兩層 Context

Accordion 需要**兩層 Context** 是這個元件最有趣的架構設計：

### 第一層：`AccordionContext`（Root 層）

```typescript
// 存放整個 Accordion 的全局狀態
interface AccordionContextValue {
  value: string[]           // 目前哪些 item 是展開的
  setValue: (v: string[]) => void
  multiple: boolean         // 是否允許多個同時展開
}
```

### 第二層：`AccordionItemContext`（Item 層）

```typescript
// 存放單一 Item 的資訊
interface AccordionItemContextValue {
  itemValue: string         // 這個 item 的唯一識別值
  isExpanded: boolean       // 這個 item 是否展開
  isDisabled: boolean       // 這個 item 是否禁用
  contentId: string         // 對應 content 的 DOM id（供 ARIA 使用）
  triggerId: string         // 對應 trigger 的 DOM id（供 ARIA 使用）
}
```

### 為什麼需要兩層？

`ItemTrigger` 和 `ItemContent` 需要知道：
1. **自己所屬的 item value** 是什麼（來自 Item Context）
2. **這個 item 是否展開**（來自 Item Context，Item 自己計算好後放進去）
3. 如何**切換展開狀態**（來自 Root Context）

```tsx
// AccordionItem：計算狀態，提供第二層 Context
function AccordionItem({ value: itemValue, children }) {
  const { value: expandedValues, setValue } = useAccordionContext()
  const isExpanded = expandedValues.includes(itemValue)

  return (
    <AccordionItemContext.Provider value={{ itemValue, isExpanded, ... }}>
      <div data-part="item" data-state={isExpanded ? 'open' : 'closed'}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

// AccordionItemTrigger：只需讀 Item Context
function AccordionItemTrigger({ children }) {
  const { isExpanded, itemValue } = useAccordionItemContext()
  const { setValue, value } = useAccordionContext()

  const handleClick = () => {
    // 切換邏輯
    const newValue = isExpanded
      ? value.filter(v => v !== itemValue)
      : [...value, itemValue]
    setValue(newValue)
  }

  return (
    <button
      aria-expanded={isExpanded}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
```

---

## 5. Ark UI 的 `createContext` 工廠

Ark UI 有個更優雅的做法，把 Context 的建立包裝成一個工廠函式：

```typescript
// 來源：https://github.com/chakra-ui/ark/blob/main/packages/react/src/utils/create-context.ts
function createContext<T>(options: { name: string }) {
  const Context = React.createContext<T | null>(null)

  function useContext(): T {
    const ctx = React.useContext(Context)
    if (!ctx) {
      throw new Error(`${options.name} must be used within its Provider`)
    }
    return ctx
  }

  return [Context.Provider, useContext] as const
}

// 使用方式
const [AccordionProvider, useAccordionContext] = createContext<AccordionContextValue>({
  name: 'AccordionContext'
})
```

這個模式更簡潔，因為 Context 物件本身不需要被外部存取，只需要 Provider 和 hook。

---

## 練習

1. 打開 [`packages/react/src/components/accordion/accordion-context.ts`](packages/react/src/components/accordion/accordion-context.ts)，根據 TODO 提示實作 Context
2. 思考：如果使用者同時傳了 `defaultValue` 和 `value`，應該優先用哪個？
3. 實作 `useAccordionItemContext` hook（第二層 Context 的 hook）
4. 比較 React 的 `useContext` 和 Vue 的 `inject`，它們解決同一個問題的方式有什麼不同？

---

## 延伸閱讀

- [React createContext](https://react.dev/reference/react/createContext)
- [React Controlled vs Uncontrolled](https://react.dev/learn/sharing-state-between-components)
- [Ark UI createContext 實作](https://github.com/chakra-ui/ark/blob/main/packages/react/src/utils/create-context.ts)
- [Radix UI Context 設計](https://github.com/radix-ui/primitives)
