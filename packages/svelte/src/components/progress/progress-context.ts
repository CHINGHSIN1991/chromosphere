import { getContext, setContext } from 'svelte'

// =============================================================================
// TODO: 定義 Progress 的 Svelte Context
// =============================================================================
//
// 💡 提示（Svelte 的 Context 方式）：
// - Svelte 使用 setContext / getContext（類似 Vue 的 provide/inject）
// - key 通常是一個 Symbol 或字串（建議用 Symbol 避免衝突）
// - 配合 Svelte 5 的 runes（$state, $derived）可以讓 context 是反應式的
//
// Svelte 5 Runes 版本範例：
// class ProgressState {
//   value = $state(...)
//   // ...
// }
//
// Context 需要包含：
//   - value: number | null  →  目前進度值（null 表示 indeterminate）
//   - min: number  →  最小值（預設 0）
//   - max: number  →  最大值（預設 100）
//
// 📖 參考：
// - Svelte Context: https://svelte.dev/docs/svelte#setcontext
// - Svelte 5 Runes: https://svelte.dev/docs/svelte/$state
// - Ark UI Svelte Context：https://github.com/chakra-ui/ark/blob/main/packages/svelte/src/lib/utils/create-context.svelte.ts
// =============================================================================

const CONTEXT_KEY = Symbol('Progress')

// TODO: 定義型別
// export interface ProgressContextValue {
//   value: number | null
//   min: number
//   max: number
// }

// TODO: set context 函式
// export function setProgressContext(value: ProgressContextValue) {
//   setContext(CONTEXT_KEY, value)
// }

// TODO: get context 函式
// export function getProgressContext(): ProgressContextValue {
//   const context = getContext<ProgressContextValue>(CONTEXT_KEY)
//   if (!context) {
//     throw new Error('getProgressContext must be called within ProgressRoot')
//   }
//   return context
// }
