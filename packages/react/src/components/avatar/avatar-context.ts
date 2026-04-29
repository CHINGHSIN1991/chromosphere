import { createContext, useContext } from 'react'

// =============================================================================
// TODO: 定義 Avatar 的 Context
// =============================================================================
//
// 💡 提示：
// 1. 定義 Context 的形狀（AvatarContextValue interface）
// 2. 用 createContext 建立 Context（預設值設為 null）
// 3. 建立 useAvatarContext hook，加上防護性錯誤處理
//
// Context 需要包含的欄位：
//   - status: "loading" | "loaded" | "error"  →  圖片載入狀態
//   - setStatus: (status: "loading" | "loaded" | "error") => void  →  更新載入狀態
//
// 📖 參考：
// - createContext: https://react.dev/reference/react/createContext
// - Ark UI 自訂 createContext 範例：https://github.com/chakra-ui/ark/blob/main/packages/react/src/utils/create-context.ts
// =============================================================================

// TODO: 定義 AvatarContextValue interface
// export interface AvatarContextValue {
//   status: "loading" | "loaded" | "error"
//   setStatus: (status: "loading" | "loaded" | "error") => void
// }

// TODO: 建立 Context
// export const AvatarContext = createContext<AvatarContextValue | null>(null)

// TODO: 建立 useAvatarContext hook
// export function useAvatarContext(): AvatarContextValue {
//   const context = useContext(AvatarContext)
//   if (!context) {
//     throw new Error('useAvatarContext must be used within <Avatar.Root>')
//   }
//   return context
// }
