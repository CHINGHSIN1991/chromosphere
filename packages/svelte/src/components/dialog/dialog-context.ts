import { getContext, setContext } from 'svelte'

// =============================================================================
// TODO: 定義 Dialog 的 Svelte Context
// =============================================================================
//
// 💡 提示（Svelte 的 Context 方式）：
// - Svelte 使用 setContext / getContext（類似 Vue 的 provide/inject）
// - key 通常是一個 Symbol 或字串（建議用 Symbol 避免衝突）
// - 配合 Svelte 5 的 runes（$state, $derived）可以讓 context 是反應式的
//
// Svelte 5 Runes 版本範例：
// class DialogState {
//   value = $state(...)
//   // ...
// }
//
// Context 需要包含：
//   - open: boolean  →  Dialog 是否開啟
//   - setOpen: (open: boolean) => void  →  控制 open 狀態
//   - contentId: string  →  Dialog content 的唯一 id（供 ARIA 使用）
//   - titleId: string  →  Dialog title 的唯一 id
//   - descriptionId: string  →  Dialog description 的唯一 id
//
// 📖 參考：
// - Svelte Context: https://svelte.dev/docs/svelte#setcontext
// - Svelte 5 Runes: https://svelte.dev/docs/svelte/$state
// - Ark UI Svelte Context：https://github.com/chakra-ui/ark/blob/main/packages/svelte/src/lib/utils/create-context.svelte.ts
// =============================================================================

const CONTEXT_KEY = Symbol('Dialog')

// TODO: 定義型別
// export interface DialogContextValue {
//   open: boolean
//   setOpen: (open: boolean) => void
//   contentId: string
//   titleId: string
//   descriptionId: string
// }

// TODO: set context 函式
// export function setDialogContext(value: DialogContextValue) {
//   setContext(CONTEXT_KEY, value)
// }

// TODO: get context 函式
// export function getDialogContext(): DialogContextValue {
//   const context = getContext<DialogContextValue>(CONTEXT_KEY)
//   if (!context) {
//     throw new Error('getDialogContext must be called within DialogRoot')
//   }
//   return context
// }
