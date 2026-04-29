import { createContext, useContext } from 'solid-js'

// =============================================================================
// TODO: 定義 Checkbox 的 Solid Context
// =============================================================================
//
// 💡 提示（Solid 與 React 的差異）：
// - Solid 的 createContext 需要傳入預設值，不能是 null（或加型別斷言）
// - 通常的做法是不傳預設值，在 use hook 中檢查是否為 undefined
// - Solid 的狀態用 createSignal、createMemo 等 primitive
//
// Context 需要包含：
//   - checked: boolean | "indeterminate"  →  勾選狀態（支援不確定狀態）
//   - setChecked: (checked: boolean | "indeterminate") => void  →  更新狀態
//   - disabled: boolean  →  是否禁用
//   - inputId: string  →  HiddenInput 的 id
//
// 📖 參考：
// - Solid createContext: https://www.solidjs.com/docs/latest#createcontext
// - Solid Accessor pattern: https://www.solidjs.com/tutorial/stores_createstore
// =============================================================================

// TODO: 定義型別
// export interface CheckboxContextValue {
//   checked: boolean | "indeterminate"
//   setChecked: (checked: boolean | "indeterminate") => void
//   disabled: boolean
//   inputId: string
// }

// TODO: 建立 Context
// const CheckboxContext = createContext<CheckboxContextValue>()

// TODO: 建立 use hook
// export function useCheckboxContext(): CheckboxContextValue {
//   const context = useContext(CheckboxContext)
//   if (!context) {
//     throw new Error('useCheckboxContext must be used within <Checkbox.Root>')
//   }
//   return context
// }
