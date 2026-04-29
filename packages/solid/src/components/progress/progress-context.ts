import { createContext, useContext } from 'solid-js'

// =============================================================================
// TODO: 定義 Progress 的 Solid Context
// =============================================================================
//
// 💡 提示（Solid 與 React 的差異）：
// - Solid 的 createContext 需要傳入預設值，不能是 null（或加型別斷言）
// - 通常的做法是不傳預設值，在 use hook 中檢查是否為 undefined
// - Solid 的狀態用 createSignal、createMemo 等 primitive
//
// Context 需要包含：
//   - value: number | null  →  目前進度值（null 表示 indeterminate）
//   - min: number  →  最小值（預設 0）
//   - max: number  →  最大值（預設 100）
//
// 📖 參考：
// - Solid createContext: https://www.solidjs.com/docs/latest#createcontext
// - Solid Accessor pattern: https://www.solidjs.com/tutorial/stores_createstore
// =============================================================================

// TODO: 定義型別
// export interface ProgressContextValue {
//   value: number | null
//   min: number
//   max: number
// }

// TODO: 建立 Context
// const ProgressContext = createContext<ProgressContextValue>()

// TODO: 建立 use hook
// export function useProgressContext(): ProgressContextValue {
//   const context = useContext(ProgressContext)
//   if (!context) {
//     throw new Error('useProgressContext must be used within <Progress.Root>')
//   }
//   return context
// }
