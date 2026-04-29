import { getContext, setContext } from 'svelte'

// =============================================================================
// TODO: 定義 Checkbox 的 Svelte Context
// =============================================================================
//
// 💡 提示（Svelte 的 Context 方式）：
// - Svelte 使用 setContext / getContext（類似 Vue 的 provide/inject）
// - key 通常是一個 Symbol 或字串（建議用 Symbol 避免衝突）
// - 配合 Svelte 5 的 runes（$state, $derived）可以讓 context 是反應式的
//
// Svelte 5 Runes 版本範例：
// class CheckboxState {
//   value = $state(...)
//   // ...
// }
//
// Context 需要包含：
//   - checked: boolean | "indeterminate"  →  勾選狀態（支援不確定狀態）
//   - setChecked: (checked: boolean | "indeterminate") => void  →  更新狀態
//   - disabled: boolean  →  是否禁用
//   - inputId: string  →  HiddenInput 的 id
//
// 📖 參考：
// - Svelte Context: https://svelte.dev/docs/svelte#setcontext
// - Svelte 5 Runes: https://svelte.dev/docs/svelte/$state
// - Ark UI Svelte Context：https://github.com/chakra-ui/ark/blob/main/packages/svelte/src/lib/utils/create-context.svelte.ts
// =============================================================================

const CONTEXT_KEY = Symbol('Checkbox')

// TODO: 定義型別
// export interface CheckboxContextValue {
//   checked: boolean | "indeterminate"
//   setChecked: (checked: boolean | "indeterminate") => void
//   disabled: boolean
//   inputId: string
// }

// TODO: set context 函式
// export function setCheckboxContext(value: CheckboxContextValue) {
//   setContext(CONTEXT_KEY, value)
// }

// TODO: get context 函式
// export function getCheckboxContext(): CheckboxContextValue {
//   const context = getContext<CheckboxContextValue>(CONTEXT_KEY)
//   if (!context) {
//     throw new Error('getCheckboxContext must be called within CheckboxRoot')
//   }
//   return context
// }
