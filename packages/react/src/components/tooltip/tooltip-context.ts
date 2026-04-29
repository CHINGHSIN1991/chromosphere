import { createContext, useContext } from 'react'

// =============================================================================
// TODO: 定義 Tooltip 的 Context
// =============================================================================
//
// 💡 提示：
// 1. 定義 Context 的形狀（TooltipContextValue interface）
// 2. 用 createContext 建立 Context（預設值設為 null）
// 3. 建立 useTooltipContext hook，加上防護性錯誤處理
//
// Context 需要包含的欄位：
//   - open: boolean  →  Tooltip 是否顯示
//   - setOpen: (open: boolean) => void  →  控制顯示狀態
//   - contentId: string  →  Content 的 id（供 Trigger aria-describedby 使用）
//
// 📖 參考：
// - createContext: https://react.dev/reference/react/createContext
// - Ark UI 自訂 createContext 範例：https://github.com/chakra-ui/ark/blob/main/packages/react/src/utils/create-context.ts
// =============================================================================

// TODO: 定義 TooltipContextValue interface
// export interface TooltipContextValue {
//   open: boolean
//   setOpen: (open: boolean) => void
//   contentId: string
// }

// TODO: 建立 Context
// export const TooltipContext = createContext<TooltipContextValue | null>(null)

// TODO: 建立 useTooltipContext hook
// export function useTooltipContext(): TooltipContextValue {
//   const context = useContext(TooltipContext)
//   if (!context) {
//     throw new Error('useTooltipContext must be used within <Tooltip.Root>')
//   }
//   return context
// }
