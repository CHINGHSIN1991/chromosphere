import { createContext, useContext } from 'react'

// =============================================================================
// TODO: 定義 Checkbox 的 Context
// =============================================================================
//
// 💡 提示：
// 1. 定義 Context 的形狀（CheckboxContextValue interface）
// 2. 用 createContext 建立 Context（預設值設為 null）
// 3. 建立 useCheckboxContext hook，加上防護性錯誤處理
//
// Context 需要包含的欄位：
//   - checked: boolean | "indeterminate"  →  勾選狀態（支援不確定狀態）
//   - setChecked: (checked: boolean | "indeterminate") => void  →  更新狀態
//   - disabled: boolean  →  是否禁用
//   - inputId: string  →  HiddenInput 的 id
//
// 📖 參考：
// - createContext: https://react.dev/reference/react/createContext
// - Ark UI 自訂 createContext 範例：https://github.com/chakra-ui/ark/blob/main/packages/react/src/utils/create-context.ts
// =============================================================================

// TODO: 定義 CheckboxContextValue interface
// export interface CheckboxContextValue {
//   checked: boolean | "indeterminate"
//   setChecked: (checked: boolean | "indeterminate") => void
//   disabled: boolean
//   inputId: string
// }

// TODO: 建立 Context
// export const CheckboxContext = createContext<CheckboxContextValue | null>(null)

// TODO: 建立 useCheckboxContext hook
// export function useCheckboxContext(): CheckboxContextValue {
//   const context = useContext(CheckboxContext)
//   if (!context) {
//     throw new Error('useCheckboxContext must be used within <Checkbox.Root>')
//   }
//   return context
// }
