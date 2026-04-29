import { createContext, useContext } from 'react'

// =============================================================================
// TODO: 定義 Popover 的 Context
// =============================================================================
//
// 💡 提示：
// 1. 定義 Context 的形狀（PopoverContextValue interface）
// 2. 用 createContext 建立 Context（預設值設為 null）
// 3. 建立 usePopoverContext hook，加上防護性錯誤處理
//
// Context 需要包含的欄位：
//   - open: boolean  →  Popover 是否開啟
//   - setOpen: (open: boolean) => void  →  控制 open 狀態
//
// 📖 參考：
// - createContext: https://react.dev/reference/react/createContext
// - Ark UI 自訂 createContext 範例：https://github.com/chakra-ui/ark/blob/main/packages/react/src/utils/create-context.ts
// =============================================================================

// TODO: 定義 PopoverContextValue interface
// export interface PopoverContextValue {
//   open: boolean
//   setOpen: (open: boolean) => void
// }

// TODO: 建立 Context
// export const PopoverContext = createContext<PopoverContextValue | null>(null)

// TODO: 建立 usePopoverContext hook
// export function usePopoverContext(): PopoverContextValue {
//   const context = useContext(PopoverContext)
//   if (!context) {
//     throw new Error('usePopoverContext must be used within <Popover.Root>')
//   }
//   return context
// }
