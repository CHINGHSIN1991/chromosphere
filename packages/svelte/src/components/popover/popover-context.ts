import { getContext, setContext } from 'svelte'

// =============================================================================
// TODO: 定義 Popover 的 Svelte Context
// =============================================================================
//
// 💡 提示（Svelte 的 Context 方式）：
// - Svelte 使用 setContext / getContext（類似 Vue 的 provide/inject）
// - key 通常是一個 Symbol 或字串（建議用 Symbol 避免衝突）
// - 配合 Svelte 5 的 runes（$state, $derived）可以讓 context 是反應式的
//
// Svelte 5 Runes 版本範例：
// class PopoverState {
//   value = $state(...)
//   // ...
// }
//
// Context 需要包含：
//   - open: boolean  →  Popover 是否開啟
//   - setOpen: (open: boolean) => void  →  控制 open 狀態
//
// 📖 參考：
// - Svelte Context: https://svelte.dev/docs/svelte#setcontext
// - Svelte 5 Runes: https://svelte.dev/docs/svelte/$state
// - Ark UI Svelte Context：https://github.com/chakra-ui/ark/blob/main/packages/svelte/src/lib/utils/create-context.svelte.ts
// =============================================================================

const CONTEXT_KEY = Symbol('Popover')

// TODO: 定義型別
// export interface PopoverContextValue {
//   open: boolean
//   setOpen: (open: boolean) => void
// }

// TODO: set context 函式
// export function setPopoverContext(value: PopoverContextValue) {
//   setContext(CONTEXT_KEY, value)
// }

// TODO: get context 函式
// export function getPopoverContext(): PopoverContextValue {
//   const context = getContext<PopoverContextValue>(CONTEXT_KEY)
//   if (!context) {
//     throw new Error('getPopoverContext must be called within PopoverRoot')
//   }
//   return context
// }
