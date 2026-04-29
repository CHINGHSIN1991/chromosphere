import { createContext, useContext } from 'solid-js'

// =============================================================================
// TODO: 定義 Avatar 的 Solid Context
// =============================================================================
//
// 💡 提示（Solid 與 React 的差異）：
// - Solid 的 createContext 需要傳入預設值，不能是 null（或加型別斷言）
// - 通常的做法是不傳預設值，在 use hook 中檢查是否為 undefined
// - Solid 的狀態用 createSignal、createMemo 等 primitive
//
// Context 需要包含：
//   - status: "loading" | "loaded" | "error"  →  圖片載入狀態
//   - setStatus: (status: "loading" | "loaded" | "error") => void  →  更新載入狀態
//
// 📖 參考：
// - Solid createContext: https://www.solidjs.com/docs/latest#createcontext
// - Solid Accessor pattern: https://www.solidjs.com/tutorial/stores_createstore
// =============================================================================

// TODO: 定義型別
// export interface AvatarContextValue {
//   status: "loading" | "loaded" | "error"
//   setStatus: (status: "loading" | "loaded" | "error") => void
// }

// TODO: 建立 Context
// const AvatarContext = createContext<AvatarContextValue>()

// TODO: 建立 use hook
// export function useAvatarContext(): AvatarContextValue {
//   const context = useContext(AvatarContext)
//   if (!context) {
//     throw new Error('useAvatarContext must be used within <Avatar.Root>')
//   }
//   return context
// }
