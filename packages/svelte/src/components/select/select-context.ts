import { getContext, setContext } from 'svelte'

// =============================================================================
// TODO: 定義 Select 的 Svelte Context
// =============================================================================
//
// 💡 提示（Svelte 的 Context 方式）：
// - Svelte 使用 setContext / getContext（類似 Vue 的 provide/inject）
// - key 通常是一個 Symbol 或字串（建議用 Symbol 避免衝突）
// - 配合 Svelte 5 的 runes（$state, $derived）可以讓 context 是反應式的
//
// Svelte 5 Runes 版本範例：
// class SelectState {
//   value = $state(...)
//   // ...
// }
//
// Context 需要包含：
//   - value: string | string[]  →  選中的值（支援單選和多選）
//   - setValue: (value: string | string[]) => void  →  更新選中值
//   - open: boolean  →  下拉選單是否展開
//   - setOpen: (open: boolean) => void  →  控制展開狀態
//   - multiple: boolean  →  是否允許多選
//
// 📖 參考：
// - Svelte Context: https://svelte.dev/docs/svelte#setcontext
// - Svelte 5 Runes: https://svelte.dev/docs/svelte/$state
// - Ark UI Svelte Context：https://github.com/chakra-ui/ark/blob/main/packages/svelte/src/lib/utils/create-context.svelte.ts
// =============================================================================

const CONTEXT_KEY = Symbol('Select')

// TODO: 定義型別
// export interface SelectContextValue {
//   value: string | string[]
//   setValue: (value: string | string[]) => void
//   open: boolean
//   setOpen: (open: boolean) => void
//   multiple: boolean
// }

// TODO: set context 函式
// export function setSelectContext(value: SelectContextValue) {
//   setContext(CONTEXT_KEY, value)
// }

// TODO: get context 函式
// export function getSelectContext(): SelectContextValue {
//   const context = getContext<SelectContextValue>(CONTEXT_KEY)
//   if (!context) {
//     throw new Error('getSelectContext must be called within SelectRoot')
//   }
//   return context
// }
