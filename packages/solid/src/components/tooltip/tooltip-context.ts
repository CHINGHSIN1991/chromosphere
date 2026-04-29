import { createContext, useContext } from 'solid-js'

// =============================================================================
// TODO: 定義 Tooltip 的 Solid Context
// =============================================================================
//
// 💡 提示（Solid 與 React 的差異）：
// - Solid 的 createContext 需要傳入預設值，不能是 null（或加型別斷言）
// - 通常的做法是不傳預設值，在 use hook 中檢查是否為 undefined
// - Solid 的狀態用 createSignal、createMemo 等 primitive
//
// Context 需要包含：
//   - open: boolean  →  Tooltip 是否顯示
//   - setOpen: (open: boolean) => void  →  控制顯示狀態
//   - contentId: string  →  Content 的 id（供 Trigger aria-describedby 使用）
//
// 📖 參考：
// - Solid createContext: https://www.solidjs.com/docs/latest#createcontext
// - Solid Accessor pattern: https://www.solidjs.com/tutorial/stores_createstore
// =============================================================================

// TODO: 定義型別
// export interface TooltipContextValue {
//   open: boolean
//   setOpen: (open: boolean) => void
//   contentId: string
// }

// TODO: 建立 Context
// const TooltipContext = createContext<TooltipContextValue>()

// TODO: 建立 use hook
// export function useTooltipContext(): TooltipContextValue {
//   const context = useContext(TooltipContext)
//   if (!context) {
//     throw new Error('useTooltipContext must be used within <Tooltip.Root>')
//   }
//   return context
// }
