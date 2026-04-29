import { createContext, useContext } from 'solid-js'

// =============================================================================
// TODO: 定義 RadioGroup 的 Solid Context
// =============================================================================
//
// 💡 提示（Solid 與 React 的差異）：
// - Solid 的 createContext 需要傳入預設值，不能是 null（或加型別斷言）
// - 通常的做法是不傳預設值，在 use hook 中檢查是否為 undefined
// - Solid 的狀態用 createSignal、createMemo 等 primitive
//
// Context 需要包含：
//   - value: string  →  目前選中的值
//   - setValue: (value: string) => void  →  更新選中值
//   - name: string  →  表單欄位名稱（供 input[name] 使用）
//
// 📖 參考：
// - Solid createContext: https://www.solidjs.com/docs/latest#createcontext
// - Solid Accessor pattern: https://www.solidjs.com/tutorial/stores_createstore
// =============================================================================

// TODO: 定義型別
// export interface RadioGroupContextValue {
//   value: string
//   setValue: (value: string) => void
//   name: string
// }

// TODO: 建立 Context
// const RadioGroupContext = createContext<RadioGroupContextValue>()

// TODO: 建立 use hook
// export function useRadioGroupContext(): RadioGroupContextValue {
//   const context = useContext(RadioGroupContext)
//   if (!context) {
//     throw new Error('useRadioGroupContext must be used within <RadioGroup.Root>')
//   }
//   return context
// }
