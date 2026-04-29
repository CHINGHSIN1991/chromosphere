import { getContext, setContext } from 'svelte'

// =============================================================================
// TODO: 定義 Accordion 的 Svelte Context
// =============================================================================
//
// 💡 提示（Svelte 的 Context 方式）：
// - Svelte 使用 setContext / getContext（類似 Vue 的 provide/inject）
// - key 通常是一個 Symbol 或字串（建議用 Symbol 避免衝突）
// - 配合 Svelte 5 的 runes（$state, $derived）可以讓 context 是反應式的
//
// Svelte 5 Runes 版本範例：
// class AccordionState {
//   value = $state(...)
//   // ...
// }
//
// Context 需要包含：
//   - value: string[]  →  目前展開的 item 值陣列
//   - setValue: (value: string[]) => void  →  更新展開狀態
//   - multiple: boolean  →  是否允許同時展開多個 item
//
// 📖 參考：
// - Svelte Context: https://svelte.dev/docs/svelte#setcontext
// - Svelte 5 Runes: https://svelte.dev/docs/svelte/$state
// - Ark UI Svelte Context：https://github.com/chakra-ui/ark/blob/main/packages/svelte/src/lib/utils/create-context.svelte.ts
// =============================================================================

const CONTEXT_KEY = Symbol('Accordion')

// TODO: 定義型別
// export interface AccordionContextValue {
//   value: string[]
//   setValue: (value: string[]) => void
//   multiple: boolean
// }

// TODO: set context 函式
// export function setAccordionContext(value: AccordionContextValue) {
//   setContext(CONTEXT_KEY, value)
// }

// TODO: get context 函式
// export function getAccordionContext(): AccordionContextValue {
//   const context = getContext<AccordionContextValue>(CONTEXT_KEY)
//   if (!context) {
//     throw new Error('getAccordionContext must be called within AccordionRoot')
//   }
//   return context
// }
