import type { ParentProps } from 'solid-js'
import { createSignal } from 'solid-js'

// =============================================================================
// TODO: 實作 AvatarRoot（Solid 版）
// =============================================================================
//
// 💡 Solid 與 React 的主要差異：
// - 狀態管理：createSignal 代替 useState
//   const [value, setValue] = createSignal(defaultValue)
// - 沒有 forwardRef：Solid 5 使用 ref prop 直接傳遞
// - Context：用 <AvatarContext.Provider value={...}> 包住
//
// 架構重點：
// - 圖片載入狀態機：loading → loaded（onLoad）或 loading → error（onError）
// - Image 的 onLoad 和 onError 事件更新 Context 中的狀態
//
// 📖 參考：
// - Solid Signals: https://www.solidjs.com/docs/latest#createsignal
// - Solid Context: https://www.solidjs.com/docs/latest#createcontext
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/
// - Zag.js 參考: https://zagjs.com/components/react/avatar
// =============================================================================

export interface AvatarRootProps extends ParentProps {
  // TODO: 定義 props
}

export function AvatarRoot(props: AvatarRootProps) {
  // TODO: createSignal 管理狀態

  // TODO: 建立 context value

  // TODO: 渲染 Provider + div
  return null // ← 替換這行
}
