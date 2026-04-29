import { createContext, useContext } from 'solid-js'

// =============================================================================
// TODO: 定義 Collapsible 的 Solid Context
// =============================================================================
//
// 💡 提示（Solid 與 React 的差異）：
// - Solid 的 createContext 需要傳入預設值，不能是 null（或加型別斷言）
// - 通常的做法是不傳預設值，在 use hook 中檢查是否為 undefined
// - Solid 的狀態用 createSignal、createMemo 等 primitive
//
// Context 需要包含：
//   - open: boolean  →  是否展開
//   - toggle: () => void  →  切換展開/收合
//   - contentId: string  →  內容區域的唯一 id
//   - disabled: boolean  →  是否禁用
//
// 📖 參考：
// - Solid createContext: https://www.solidjs.com/docs/latest#createcontext
// - Solid Accessor pattern: https://www.solidjs.com/tutorial/stores_createstore
// =============================================================================

// TODO: 定義型別
// export interface CollapsibleContextValue {
//   open: boolean
//   toggle: () => void
//   contentId: string
//   disabled: boolean
// }

// TODO: 建立 Context
// const CollapsibleContext = createContext<CollapsibleContextValue>()

// TODO: 建立 use hook
// export function useCollapsibleContext(): CollapsibleContextValue {
//   const context = useContext(CollapsibleContext)
//   if (!context) {
//     throw new Error('useCollapsibleContext must be used within <Collapsible.Root>')
//   }
//   return context
// }
