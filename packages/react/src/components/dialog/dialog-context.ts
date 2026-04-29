import { createContext, useContext } from 'react'

// =============================================================================
// TODO: 定義 Dialog 的 Context
// =============================================================================
//
// 💡 提示：
// 1. 定義 Context 的形狀（DialogContextValue interface）
// 2. 用 createContext 建立 Context（預設值設為 null）
// 3. 建立 useDialogContext hook，加上防護性錯誤處理
//
// Context 需要包含的欄位：
//   - open: boolean  →  Dialog 是否開啟
//   - setOpen: (open: boolean) => void  →  控制 open 狀態
//   - contentId: string  →  Dialog content 的唯一 id（供 ARIA 使用）
//   - titleId: string  →  Dialog title 的唯一 id
//   - descriptionId: string  →  Dialog description 的唯一 id
//
// 📖 參考：
// - createContext: https://react.dev/reference/react/createContext
// - Ark UI 自訂 createContext 範例：https://github.com/chakra-ui/ark/blob/main/packages/react/src/utils/create-context.ts
// =============================================================================

// TODO: 定義 DialogContextValue interface
// export interface DialogContextValue {
//   open: boolean
//   setOpen: (open: boolean) => void
//   contentId: string
//   titleId: string
//   descriptionId: string
// }

// TODO: 建立 Context
// export const DialogContext = createContext<DialogContextValue | null>(null)

// TODO: 建立 useDialogContext hook
// export function useDialogContext(): DialogContextValue {
//   const context = useContext(DialogContext)
//   if (!context) {
//     throw new Error('useDialogContext must be used within <Dialog.Root>')
//   }
//   return context
// }
