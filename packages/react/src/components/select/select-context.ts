import { createContext, useContext } from 'react'

// =============================================================================
// TODO: 定義 Select 的 Context
// =============================================================================
//
// 💡 提示：
// 1. 定義 Context 的形狀（SelectContextValue interface）
// 2. 用 createContext 建立 Context（預設值設為 null）
// 3. 建立 useSelectContext hook，加上防護性錯誤處理
//
// Context 需要包含的欄位：
//   - value: string | string[]  →  選中的值（支援單選和多選）
//   - setValue: (value: string | string[]) => void  →  更新選中值
//   - open: boolean  →  下拉選單是否展開
//   - setOpen: (open: boolean) => void  →  控制展開狀態
//   - multiple: boolean  →  是否允許多選
//
// 📖 參考：
// - createContext: https://react.dev/reference/react/createContext
// - Ark UI 自訂 createContext 範例：https://github.com/chakra-ui/ark/blob/main/packages/react/src/utils/create-context.ts
// =============================================================================

// TODO: 定義 SelectContextValue interface
// export interface SelectContextValue {
//   value: string | string[]
//   setValue: (value: string | string[]) => void
//   open: boolean
//   setOpen: (open: boolean) => void
//   multiple: boolean
// }

// TODO: 建立 Context
// export const SelectContext = createContext<SelectContextValue | null>(null)

// TODO: 建立 useSelectContext hook
// export function useSelectContext(): SelectContextValue {
//   const context = useContext(SelectContext)
//   if (!context) {
//     throw new Error('useSelectContext must be used within <Select.Root>')
//   }
//   return context
// }
