import { createContext, useContext } from 'react'

// =============================================================================
// TODO: 定義 Switch 的 Context
// =============================================================================
//
// 💡 提示：
// 1. 定義 Context 的形狀（SwitchContextValue interface）
// 2. 用 createContext 建立 Context（預設值設為 null）
// 3. 建立 useSwitchContext hook，加上防護性錯誤處理
//
// Context 需要包含的欄位：
//   - checked: boolean  →  開關狀態
//   - setChecked: (checked: boolean) => void  →  切換狀態
//   - disabled: boolean  →  是否禁用
//
// 📖 參考：
// - createContext: https://react.dev/reference/react/createContext
// - Ark UI 自訂 createContext 範例：https://github.com/chakra-ui/ark/blob/main/packages/react/src/utils/create-context.ts
// =============================================================================

// TODO: 定義 SwitchContextValue interface
// export interface SwitchContextValue {
//   checked: boolean
//   setChecked: (checked: boolean) => void
//   disabled: boolean
// }

// TODO: 建立 Context
// export const SwitchContext = createContext<SwitchContextValue | null>(null)

// TODO: 建立 useSwitchContext hook
// export function useSwitchContext(): SwitchContextValue {
//   const context = useContext(SwitchContext)
//   if (!context) {
//     throw new Error('useSwitchContext must be used within <Switch.Root>')
//   }
//   return context
// }
