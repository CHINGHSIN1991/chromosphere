import { getContext, setContext } from 'svelte'

// =============================================================================
// TODO: 定義 Tooltip 的 Svelte Context
// =============================================================================
//
// 💡 提示（Svelte 的 Context 方式）：
// - Svelte 使用 setContext / getContext（類似 Vue 的 provide/inject）
// - key 通常是一個 Symbol 或字串（建議用 Symbol 避免衝突）
// - 配合 Svelte 5 的 runes（$state, $derived）可以讓 context 是反應式的
//
// Svelte 5 Runes 版本範例：
// class TooltipState {
//   value = $state(...)
//   // ...
// }
//
// Context 需要包含：
//   - open: boolean  →  Tooltip 是否顯示
//   - setOpen: (open: boolean) => void  →  控制顯示狀態
//   - contentId: string  →  Content 的 id（供 Trigger aria-describedby 使用）
//
// 📖 參考：
// - Svelte Context: https://svelte.dev/docs/svelte#setcontext
// - Svelte 5 Runes: https://svelte.dev/docs/svelte/$state
// - Ark UI Svelte Context：https://github.com/chakra-ui/ark/blob/main/packages/svelte/src/lib/utils/create-context.svelte.ts
// =============================================================================

const CONTEXT_KEY = Symbol('Tooltip')

// TODO: 定義型別
// export interface TooltipContextValue {
//   open: boolean
//   setOpen: (open: boolean) => void
//   contentId: string
// }

// TODO: set context 函式
// export function setTooltipContext(value: TooltipContextValue) {
//   setContext(CONTEXT_KEY, value)
// }

// TODO: get context 函式
// export function getTooltipContext(): TooltipContextValue {
//   const context = getContext<TooltipContextValue>(CONTEXT_KEY)
//   if (!context) {
//     throw new Error('getTooltipContext must be called within TooltipRoot')
//   }
//   return context
// }
