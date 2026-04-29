import type { ParentProps } from 'solid-js'
import { createSignal } from 'solid-js'

// =============================================================================
// TODO: 實作 TooltipRoot（Solid 版）
// =============================================================================
//
// 💡 Solid 與 React 的主要差異：
// - 狀態管理：createSignal 代替 useState
//   const [value, setValue] = createSignal(defaultValue)
// - 沒有 forwardRef：Solid 5 使用 ref prop 直接傳遞
// - Context：用 <TooltipContext.Provider value={...}> 包住
//
// 架構重點：
// - Trigger 的 aria-describedby 指向 Content 的 id
// - Content 需要 role="tooltip"
//
// 📖 參考：
// - Solid Signals: https://www.solidjs.com/docs/latest#createsignal
// - Solid Context: https://www.solidjs.com/docs/latest#createcontext
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
// - Zag.js 參考: https://zagjs.com/components/react/tooltip
// =============================================================================

export interface TooltipRootProps extends ParentProps {
  // TODO: 定義 props
}

export function TooltipRoot(props: TooltipRootProps) {
  // TODO: createSignal 管理狀態

  // TODO: 建立 context value

  // TODO: 渲染 Provider + div
  return null // ← 替換這行
}
