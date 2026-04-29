import { createContext, useContext } from 'react'

// =============================================================================
// TODO: 定義 Tabs 的 Context
// =============================================================================
//
// 💡 提示：
// 1. 定義 Context 的形狀（TabsContextValue interface）
// 2. 用 createContext 建立 Context（預設值設為 null）
// 3. 建立 useTabsContext hook，加上防護性錯誤處理
//
// Context 需要包含的欄位：
//   - value: string  →  目前 active 的 tab value
//   - setValue: (value: string) => void  →  切換 tab
//
// 📖 參考：
// - createContext: https://react.dev/reference/react/createContext
// - Ark UI 自訂 createContext 範例：https://github.com/chakra-ui/ark/blob/main/packages/react/src/utils/create-context.ts
// =============================================================================

// TODO: 定義 TabsContextValue interface
// export interface TabsContextValue {
//   value: string
//   setValue: (value: string) => void
// }

// TODO: 建立 Context
// export const TabsContext = createContext<TabsContextValue | null>(null)

// TODO: 建立 useTabsContext hook
// export function useTabsContext(): TabsContextValue {
//   const context = useContext(TabsContext)
//   if (!context) {
//     throw new Error('useTabsContext must be used within <Tabs.Root>')
//   }
//   return context
// }
