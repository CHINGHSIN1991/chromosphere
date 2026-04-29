import { createContext, useContext } from 'solid-js'

// =============================================================================
// TODO: 定義 Dialog 的 Solid Context
// =============================================================================
//
// 💡 提示（Solid 與 React 的差異）：
// - Solid 的 createContext 需要傳入預設值，不能是 null（或加型別斷言）
// - 通常的做法是不傳預設值，在 use hook 中檢查是否為 undefined
// - Solid 的狀態用 createSignal、createMemo 等 primitive
//
// Context 需要包含：
//   - open: boolean  →  Dialog 是否開啟
//   - setOpen: (open: boolean) => void  →  控制 open 狀態
//   - contentId: string  →  Dialog content 的唯一 id（供 ARIA 使用）
//   - titleId: string  →  Dialog title 的唯一 id
//   - descriptionId: string  →  Dialog description 的唯一 id
//
// 📖 參考：
// - Solid createContext: https://www.solidjs.com/docs/latest#createcontext
// - Solid Accessor pattern: https://www.solidjs.com/tutorial/stores_createstore
// =============================================================================

// TODO: 定義型別
// export interface DialogContextValue {
//   open: boolean
//   setOpen: (open: boolean) => void
//   contentId: string
//   titleId: string
//   descriptionId: string
// }

// TODO: 建立 Context
// const DialogContext = createContext<DialogContextValue>()

// TODO: 建立 use hook
// export function useDialogContext(): DialogContextValue {
//   const context = useContext(DialogContext)
//   if (!context) {
//     throw new Error('useDialogContext must be used within <Dialog.Root>')
//   }
//   return context
// }
