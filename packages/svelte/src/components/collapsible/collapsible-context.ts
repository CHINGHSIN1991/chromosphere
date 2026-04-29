import { getContext, setContext } from 'svelte'

// =============================================================================
// TODO: 定義 Collapsible 的 Svelte Context
// =============================================================================
//
// 💡 提示（Svelte 的 Context 方式）：
// - Svelte 使用 setContext / getContext（類似 Vue 的 provide/inject）
// - key 通常是一個 Symbol 或字串（建議用 Symbol 避免衝突）
// - 配合 Svelte 5 的 runes（$state, $derived）可以讓 context 是反應式的
//
// Svelte 5 Runes 版本範例：
// class CollapsibleState {
//   value = $state(...)
//   // ...
// }
//
// Context 需要包含：
//   - open: boolean  →  是否展開
//   - toggle: () => void  →  切換展開/收合
//   - contentId: string  →  內容區域的唯一 id
//   - disabled: boolean  →  是否禁用
//
// 📖 參考：
// - Svelte Context: https://svelte.dev/docs/svelte#setcontext
// - Svelte 5 Runes: https://svelte.dev/docs/svelte/$state
// - Ark UI Svelte Context：https://github.com/chakra-ui/ark/blob/main/packages/svelte/src/lib/utils/create-context.svelte.ts
// =============================================================================

const CONTEXT_KEY = Symbol('Collapsible')

// TODO: 定義型別
// export interface CollapsibleContextValue {
//   open: boolean
//   toggle: () => void
//   contentId: string
//   disabled: boolean
// }

// TODO: set context 函式
// export function setCollapsibleContext(value: CollapsibleContextValue) {
//   setContext(CONTEXT_KEY, value)
// }

// TODO: get context 函式
// export function getCollapsibleContext(): CollapsibleContextValue {
//   const context = getContext<CollapsibleContextValue>(CONTEXT_KEY)
//   if (!context) {
//     throw new Error('getCollapsibleContext must be called within CollapsibleRoot')
//   }
//   return context
// }
