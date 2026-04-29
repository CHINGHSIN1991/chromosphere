import { createContext, useContext } from 'react'

// =============================================================================
// TODO: 定義 Accordion 的 Context
// =============================================================================
//
// 💡 提示：
// 1. 定義 Context 的形狀（AccordionContextValue interface）
// 2. 用 createContext 建立 Context（預設值設為 null）
// 3. 建立 useAccordionContext hook，加上防護性錯誤處理
//
// Context 需要包含的欄位：
//   - value: string[]  →  目前展開的 item 值陣列
//   - setValue: (value: string[]) => void  →  更新展開狀態
//   - multiple: boolean  →  是否允許同時展開多個 item
//
// 📖 參考：
// - createContext: https://react.dev/reference/react/createContext
// - Ark UI 自訂 createContext 範例：https://github.com/chakra-ui/ark/blob/main/packages/react/src/utils/create-context.ts
// =============================================================================

// TODO: 定義 AccordionContextValue interface
// export interface AccordionContextValue {
//   value: string[]
//   setValue: (value: string[]) => void
//   multiple: boolean
// }

// TODO: 建立 Context
// export const AccordionContext = createContext<AccordionContextValue | null>(null)

// TODO: 建立 useAccordionContext hook
// export function useAccordionContext(): AccordionContextValue {
//   const context = useContext(AccordionContext)
//   if (!context) {
//     throw new Error('useAccordionContext must be used within <Accordion.Root>')
//   }
//   return context
// }
