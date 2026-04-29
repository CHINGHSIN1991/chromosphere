import { createContext, useContext } from 'solid-js'

// =============================================================================
// TODO: 定義 Accordion 的 Solid Context
// =============================================================================
//
// 💡 提示（Solid 與 React 的差異）：
// - Solid 的 createContext 需要傳入預設值，不能是 null（或加型別斷言）
// - 通常的做法是不傳預設值，在 use hook 中檢查是否為 undefined
// - Solid 的狀態用 createSignal、createMemo 等 primitive
//
// Context 需要包含：
//   - value: string[]  →  目前展開的 item 值陣列
//   - setValue: (value: string[]) => void  →  更新展開狀態
//   - multiple: boolean  →  是否允許同時展開多個 item
//
// 📖 參考：
// - Solid createContext: https://www.solidjs.com/docs/latest#createcontext
// - Solid Accessor pattern: https://www.solidjs.com/tutorial/stores_createstore
// =============================================================================

// TODO: 定義型別
// export interface AccordionContextValue {
//   value: string[]
//   setValue: (value: string[]) => void
//   multiple: boolean
// }

// TODO: 建立 Context
// const AccordionContext = createContext<AccordionContextValue>()

// TODO: 建立 use hook
// export function useAccordionContext(): AccordionContextValue {
//   const context = useContext(AccordionContext)
//   if (!context) {
//     throw new Error('useAccordionContext must be used within <Accordion.Root>')
//   }
//   return context
// }
