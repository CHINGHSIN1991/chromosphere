import { createContext, useContext } from 'solid-js'

// =============================================================================
// TODO: 定義 Select 的 Solid Context
// =============================================================================
//
// 💡 提示（Solid 與 React 的差異）：
// - Solid 的 createContext 需要傳入預設值，不能是 null（或加型別斷言）
// - 通常的做法是不傳預設值，在 use hook 中檢查是否為 undefined
// - Solid 的狀態用 createSignal、createMemo 等 primitive
//
// Context 需要包含：
//   - value: string | string[]  →  選中的值（支援單選和多選）
//   - setValue: (value: string | string[]) => void  →  更新選中值
//   - open: boolean  →  下拉選單是否展開
//   - setOpen: (open: boolean) => void  →  控制展開狀態
//   - multiple: boolean  →  是否允許多選
//
// 📖 參考：
// - Solid createContext: https://www.solidjs.com/docs/latest#createcontext
// - Solid Accessor pattern: https://www.solidjs.com/tutorial/stores_createstore
// =============================================================================

// TODO: 定義型別
// export interface SelectContextValue {
//   value: string | string[]
//   setValue: (value: string | string[]) => void
//   open: boolean
//   setOpen: (open: boolean) => void
//   multiple: boolean
// }

// TODO: 建立 Context
// const SelectContext = createContext<SelectContextValue>()

// TODO: 建立 use hook
// export function useSelectContext(): SelectContextValue {
//   const context = useContext(SelectContext)
//   if (!context) {
//     throw new Error('useSelectContext must be used within <Select.Root>')
//   }
//   return context
// }
