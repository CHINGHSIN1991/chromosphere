# Ch09：多框架比較

## 關鍵知識點

- 相同元件邏輯在 React、SolidJS、Vue、Svelte 中的實作差異
- React `useState` vs Solid `createSignal` vs Vue `ref` vs Svelte `$state`
- React `createContext` vs Solid `createContext` vs Vue `provide/inject` vs Svelte `setContext/getContext`
- 各框架的「組件」語法差異
- 反應式系統（Reactivity）的設計哲學差異

---

## 1. 狀態管理比較

同一個概念「管理 accordion 展開的值」在各框架的實作：

### React

```typescript
// hooks 只能在元件函式內使用
import { useState } from 'react'

const [value, setValue] = useState<string[]>([])
// value 是快照（snapshot）
// setValue 觸發重新渲染
```

### SolidJS

```typescript
// Solid 使用 signal，細粒度反應式
import { createSignal } from 'solid-js'

const [value, setValue] = createSignal<string[]>([])
// value 是一個函式：value() → string[]
// setValue 觸發對應的計算更新（不重新渲染整個元件）
```

### Vue 3

```typescript
// Composition API
import { ref } from 'vue'

const value = ref<string[]>([])
// value 是一個物件：value.value → string[]
// 在 <template> 中自動解包：{{ value }}（不需要 .value）
```

### Svelte 5（Runes）

```typescript
// Svelte 5 使用 runes
let value = $state<string[]>([])
// value 是直接賦值的變數
// 直接修改：value = newValue
```

### 核心差異

| 特性 | React | Solid | Vue | Svelte 5 |
|------|-------|-------|-----|---------|
| 讀取值 | `value` | `value()` | `value.value` | `value` |
| 更新值 | `setValue(new)` | `setValue(new)` | `value.value = new` | `value = new` |
| 語法感 | 函式呼叫 | 函式呼叫 | 物件屬性 | 直接賦值 |
| 細粒度更新 | ❌（重渲染整個元件） | ✅（只更新訂閱的部分） | ✅ | ✅ |

---

## 2. Context / 狀態共享比較

### React

```typescript
// 建立 Context
import { createContext, useContext } from 'react'
const AccordionContext = createContext<AccordionContextValue | null>(null)

// Provider（在 AccordionRoot 中）
<AccordionContext.Provider value={{ value, setValue, multiple }}>
  {children}
</AccordionContext.Provider>

// 消費（在子元件中）
const context = useContext(AccordionContext)
```

### SolidJS

```typescript
// 建立 Context（幾乎相同的 API）
import { createContext, useContext } from 'solid-js'
const AccordionContext = createContext<AccordionContextValue>()

// Provider
<AccordionContext.Provider value={{ value, setValue, multiple }}>
  {props.children}
</AccordionContext.Provider>

// 消費
const context = useContext(AccordionContext)
```

### Vue 3

```typescript
// Provider（在 AccordionRoot 的 setup 中）
import { provide, inject } from 'vue'
const ACCORDION_KEY = Symbol('accordion')

// 提供
provide(ACCORDION_KEY, { value, setValue, multiple })

// 消費（在子元件的 setup 中）
const context = inject(ACCORDION_KEY)
```

### Svelte

```typescript
// Provider（在 AccordionRoot 的 <script> 中）
import { setContext, getContext } from 'svelte'
const ACCORDION_KEY = Symbol('accordion')

// 提供
setContext(ACCORDION_KEY, { get value() { return value }, setValue, multiple })

// 消費（在子元件的 <script> 中）
const context = getContext(ACCORDION_KEY)
```

---

## 3. 元件定義語法比較

以 AccordionItemTrigger 為例：

### React（TSX）

```tsx
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

export const AccordionItemTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'>
>((props, ref) => {
  const { isExpanded } = useAccordionItemContext()

  return (
    <button ref={ref} aria-expanded={isExpanded} {...props} />
  )
})
```

### SolidJS（TSX）

```tsx
import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js'

// Solid 不需要 forwardRef（ref 直接傳遞）
export function AccordionItemTrigger(props: JSX.IntrinsicElements['button']) {
  const ctx = useAccordionItemContext()
  const [local, rest] = splitProps(props, ['onClick'])
  // splitProps 類似 React 的解構，但會保持反應性

  return (
    <button aria-expanded={ctx.isExpanded} {...rest} />
  )
}
```

### Vue 3（SFC）

```vue
<!-- AccordionItemTrigger.vue -->
<script setup lang="ts">
import { useAccordionItemContext } from './accordion-context'

const props = defineProps<{
  // 可以加自訂 props
}>()

const ctx = useAccordionItemContext()
</script>

<template>
  <button :aria-expanded="ctx.isExpanded" v-bind="$attrs">
    <slot />
  </button>
</template>
```

### Svelte 5（.svelte）

```svelte
<!-- AccordionItemTrigger.svelte -->
<script lang="ts">
  import { getAccordionItemContext } from './accordion-context'

  let { children, ...rest }: { children?: any } = $props()
  const ctx = getAccordionItemContext()
</script>

<button aria-expanded={ctx.isExpanded} {...rest}>
  {@render children?.()}
</button>
```

---

## 4. 反應式哲學的差異

### React：「快照」模型

```typescript
// React 的狀態是不可變的快照
const [value, setValue] = useState([])

// ❌ 直接修改不會觸發重渲染
value.push('item-1')  // 無效！

// ✅ 必須建立新的值
setValue([...value, 'item-1'])
```

### SolidJS：「信號」模型（Signal）

```typescript
// Solid 的 signal 是細粒度的反應式源
const [value, setValue] = createSignal([])

// 讀取時需要「呼叫」signal
console.log(value())  // 讀取

// 更新可以傳入新值或 updater 函式
setValue(prev => [...prev, 'item-1'])
```

### Vue：「代理」模型（Proxy）

```typescript
// Vue 用 Proxy 追蹤讀取和修改
const value = ref([])

// 透過 .value 存取
value.value.push('item-1')  // ✅ Vue 的 reactive array 可以直接 push
```

### Svelte：「編譯時追蹤」模型

```typescript
// Svelte 在編譯時分析哪些變數需要追蹤
let value = $state([])

// 直接賦值，Svelte 編譯器會加入追蹤邏輯
value = [...value, 'item-1']
```

---

## 5. Props 傳遞比較

| 特性 | React | Solid | Vue | Svelte |
|------|-------|-------|-----|--------|
| HTML 屬性展開 | `{...props}` | `{...rest}` | `v-bind="$attrs"` | `{...rest}` |
| ref 轉發 | `forwardRef` | 直接傳 `ref` | `defineExpose` 或 `ref` | `bind:this` |
| 事件處理 | `onClick` | `onClick` | `@click` 或 `:onClick` | `onclick` |
| children | `children` prop | `children` prop | `<slot>` | `{@render children()}` |

---

## 6. 各框架的 Accordion 目錄結構

```
packages/
├── react/src/components/accordion/
│   ├── accordion-context.ts      ← createContext / useContext
│   ├── accordion-root.tsx        ← forwardRef + useState
│   ├── accordion-item.tsx        ← forwardRef + Context
│   ├── accordion-item-trigger.tsx
│   ├── accordion-item-content.tsx
│   ├── accordion.ts              ← Namespace 物件
│   └── index.ts
│
├── solid/src/components/accordion/
│   ├── accordion-context.ts      ← createContext（Solid 版）
│   ├── accordion-root.tsx        ← splitProps + createSignal
│   ├── accordion-item.tsx
│   ├── accordion-item-trigger.tsx
│   ├── accordion-item-content.tsx
│   ├── accordion.ts
│   └── index.ts
│
├── svelte/src/components/accordion/
│   ├── accordion-context.ts      ← setContext / getContext
│   ├── AccordionRoot.svelte      ← 注意：Svelte 用 PascalCase 檔名
│   ├── AccordionItem.svelte
│   ├── AccordionItemTrigger.svelte
│   ├── AccordionItemContent.svelte
│   ├── accordion.ts
│   └── index.ts
│
└── vue/src/components/accordion/
    ├── accordion-context.ts      ← provide / inject
    ├── AccordionRoot.vue         ← 注意：Vue SFC 用 PascalCase 檔名
    ├── AccordionItem.vue
    ├── AccordionItemTrigger.vue
    ├── AccordionItemContent.vue
    ├── accordion.ts
    └── index.ts
```

---

## 練習

1. 打開 React 和 Solid 的 `accordion-context.ts`，比較兩者的 `createContext` 用法差異
2. 打開 Vue 的 `accordion-context.ts`，理解 `provide/inject` 的 Symbol key 設計
3. 打開 Svelte 的 `accordion-context.ts`，注意 `$state` getter 模式：`get value() { return value }`
4. 選擇任一你熟悉的框架（Vue 或 Solid），根據 React 版的 TODO 提示實作對應版本

---

## 延伸閱讀

- [React State](https://react.dev/learn/state-a-components-memory)
- [SolidJS createSignal](https://www.solidjs.com/docs/latest/api#createsignal)
- [Vue Reactivity](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)
- [Solid vs React](https://www.solidjs.com/guides/comparison)
