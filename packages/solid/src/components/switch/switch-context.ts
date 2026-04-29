import { createContext, useContext } from 'solid-js'

// =============================================================================
// TODO: 定義 Switch 的 Solid Context
// =============================================================================
//
// 💡 提示（Solid 與 React 的差異）：
// - Solid 的 createContext 需要傳入預設值，不能是 null（或加型別斷言）
// - 通常的做法是不傳預設值，在 use hook 中檢查是否為 undefined
// - Solid 的狀態用 createSignal、createMemo 等 primitive
//
// Context 需要包含：
//   - checked: boolean  →  開關狀態
//   - setChecked: (checked: boolean) => void  →  切換狀態
//   - disabled: boolean  →  是否禁用
//
// 📖 參考：
// - Solid createContext: https://www.solidjs.com/docs/latest#createcontext
// - Solid Accessor pattern: https://www.solidjs.com/tutorial/stores_createstore
// =============================================================================

// TODO: 定義型別
// export interface SwitchContextValue {
//   checked: boolean
//   setChecked: (checked: boolean) => void
//   disabled: boolean
// }

// TODO: 建立 Context
// const SwitchContext = createContext<SwitchContextValue>()

// TODO: 建立 use hook
// export function useSwitchContext(): SwitchContextValue {
//   const context = useContext(SwitchContext)
//   if (!context) {
//     throw new Error('useSwitchContext must be used within <Switch.Root>')
//   }
//   return context
// }
