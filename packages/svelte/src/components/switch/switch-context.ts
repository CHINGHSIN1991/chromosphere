import { getContext, setContext } from 'svelte'

// =============================================================================
// TODO: 定義 Switch 的 Svelte Context
// =============================================================================
//
// 💡 提示（Svelte 的 Context 方式）：
// - Svelte 使用 setContext / getContext（類似 Vue 的 provide/inject）
// - key 通常是一個 Symbol 或字串（建議用 Symbol 避免衝突）
// - 配合 Svelte 5 的 runes（$state, $derived）可以讓 context 是反應式的
//
// Svelte 5 Runes 版本範例：
// class SwitchState {
//   value = $state(...)
//   // ...
// }
//
// Context 需要包含：
//   - checked: boolean  →  開關狀態
//   - setChecked: (checked: boolean) => void  →  切換狀態
//   - disabled: boolean  →  是否禁用
//
// 📖 參考：
// - Svelte Context: https://svelte.dev/docs/svelte#setcontext
// - Svelte 5 Runes: https://svelte.dev/docs/svelte/$state
// - Ark UI Svelte Context：https://github.com/chakra-ui/ark/blob/main/packages/svelte/src/lib/utils/create-context.svelte.ts
// =============================================================================

const CONTEXT_KEY = Symbol('Switch')

// TODO: 定義型別
// export interface SwitchContextValue {
//   checked: boolean
//   setChecked: (checked: boolean) => void
//   disabled: boolean
// }

// TODO: set context 函式
// export function setSwitchContext(value: SwitchContextValue) {
//   setContext(CONTEXT_KEY, value)
// }

// TODO: get context 函式
// export function getSwitchContext(): SwitchContextValue {
//   const context = getContext<SwitchContextValue>(CONTEXT_KEY)
//   if (!context) {
//     throw new Error('getSwitchContext must be called within SwitchRoot')
//   }
//   return context
// }
