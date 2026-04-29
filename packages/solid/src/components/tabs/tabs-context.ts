import { createContext, useContext } from 'solid-js'

// =============================================================================
// TODO: 定義 Tabs 的 Solid Context
// =============================================================================
//
// 💡 提示（Solid 與 React 的差異）：
// - Solid 的 createContext 需要傳入預設值，不能是 null（或加型別斷言）
// - 通常的做法是不傳預設值，在 use hook 中檢查是否為 undefined
// - Solid 的狀態用 createSignal、createMemo 等 primitive
//
// Context 需要包含：
//   - value: string  →  目前 active 的 tab value
//   - setValue: (value: string) => void  →  切換 tab
//
// 📖 參考：
// - Solid createContext: https://www.solidjs.com/docs/latest#createcontext
// - Solid Accessor pattern: https://www.solidjs.com/tutorial/stores_createstore
// =============================================================================

// TODO: 定義型別
// export interface TabsContextValue {
//   value: string
//   setValue: (value: string) => void
// }

// TODO: 建立 Context
// const TabsContext = createContext<TabsContextValue>()

// TODO: 建立 use hook
// export function useTabsContext(): TabsContextValue {
//   const context = useContext(TabsContext)
//   if (!context) {
//     throw new Error('useTabsContext must be used within <Tabs.Root>')
//   }
//   return context
// }
