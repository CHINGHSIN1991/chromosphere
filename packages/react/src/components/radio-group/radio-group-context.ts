import { createContext, useContext } from 'react'

// =============================================================================
// TODO: 定義 RadioGroup 的 Context
// =============================================================================
//
// 💡 提示：
// 1. 定義 Context 的形狀（RadioGroupContextValue interface）
// 2. 用 createContext 建立 Context（預設值設為 null）
// 3. 建立 useRadioGroupContext hook，加上防護性錯誤處理
//
// Context 需要包含的欄位：
//   - value: string  →  目前選中的值
//   - setValue: (value: string) => void  →  更新選中值
//   - name: string  →  表單欄位名稱（供 input[name] 使用）
//
// 📖 參考：
// - createContext: https://react.dev/reference/react/createContext
// - Ark UI 自訂 createContext 範例：https://github.com/chakra-ui/ark/blob/main/packages/react/src/utils/create-context.ts
// =============================================================================

// TODO: 定義 RadioGroupContextValue interface
// export interface RadioGroupContextValue {
//   value: string
//   setValue: (value: string) => void
//   name: string
// }

// TODO: 建立 Context
// export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

// TODO: 建立 useRadioGroupContext hook
// export function useRadioGroupContext(): RadioGroupContextValue {
//   const context = useContext(RadioGroupContext)
//   if (!context) {
//     throw new Error('useRadioGroupContext must be used within <RadioGroup.Root>')
//   }
//   return context
// }
