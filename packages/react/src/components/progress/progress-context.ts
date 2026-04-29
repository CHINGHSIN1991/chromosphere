import { createContext, useContext } from 'react'

// =============================================================================
// TODO: 定義 Progress 的 Context
// =============================================================================
//
// 💡 提示：
// 1. 定義 Context 的形狀（ProgressContextValue interface）
// 2. 用 createContext 建立 Context（預設值設為 null）
// 3. 建立 useProgressContext hook，加上防護性錯誤處理
//
// Context 需要包含的欄位：
//   - value: number | null  →  目前進度值（null 表示 indeterminate）
//   - min: number  →  最小值（預設 0）
//   - max: number  →  最大值（預設 100）
//
// 📖 參考：
// - createContext: https://react.dev/reference/react/createContext
// - Ark UI 自訂 createContext 範例：https://github.com/chakra-ui/ark/blob/main/packages/react/src/utils/create-context.ts
// =============================================================================

// TODO: 定義 ProgressContextValue interface
// export interface ProgressContextValue {
//   value: number | null
//   min: number
//   max: number
// }

// TODO: 建立 Context
// export const ProgressContext = createContext<ProgressContextValue | null>(null)

// TODO: 建立 useProgressContext hook
// export function useProgressContext(): ProgressContextValue {
//   const context = useContext(ProgressContext)
//   if (!context) {
//     throw new Error('useProgressContext must be used within <Progress.Root>')
//   }
//   return context
// }
