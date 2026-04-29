import { getContext, setContext } from 'svelte'

// =============================================================================
// TODO: 定義 RadioGroup 的 Svelte Context
// =============================================================================
//
// 💡 提示（Svelte 的 Context 方式）：
// - Svelte 使用 setContext / getContext（類似 Vue 的 provide/inject）
// - key 通常是一個 Symbol 或字串（建議用 Symbol 避免衝突）
// - 配合 Svelte 5 的 runes（$state, $derived）可以讓 context 是反應式的
//
// Svelte 5 Runes 版本範例：
// class RadioGroupState {
//   value = $state(...)
//   // ...
// }
//
// Context 需要包含：
//   - value: string  →  目前選中的值
//   - setValue: (value: string) => void  →  更新選中值
//   - name: string  →  表單欄位名稱（供 input[name] 使用）
//
// 📖 參考：
// - Svelte Context: https://svelte.dev/docs/svelte#setcontext
// - Svelte 5 Runes: https://svelte.dev/docs/svelte/$state
// - Ark UI Svelte Context：https://github.com/chakra-ui/ark/blob/main/packages/svelte/src/lib/utils/create-context.svelte.ts
// =============================================================================

const CONTEXT_KEY = Symbol('RadioGroup')

// TODO: 定義型別
// export interface RadioGroupContextValue {
//   value: string
//   setValue: (value: string) => void
//   name: string
// }

// TODO: set context 函式
// export function setRadioGroupContext(value: RadioGroupContextValue) {
//   setContext(CONTEXT_KEY, value)
// }

// TODO: get context 函式
// export function getRadioGroupContext(): RadioGroupContextValue {
//   const context = getContext<RadioGroupContextValue>(CONTEXT_KEY)
//   if (!context) {
//     throw new Error('getRadioGroupContext must be called within RadioGroupRoot')
//   }
//   return context
// }
