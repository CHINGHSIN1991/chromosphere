import type { ParentProps } from 'solid-js'
import { createSignal } from 'solid-js'

// =============================================================================
// TODO: 實作 PopoverRoot（Solid 版）
// =============================================================================
//
// 💡 Solid 與 React 的主要差異：
// - 狀態管理：createSignal 代替 useState
//   const [value, setValue] = createSignal(defaultValue)
// - 沒有 forwardRef：Solid 5 使用 ref prop 直接傳遞
// - Context：用 <PopoverContext.Provider value={...}> 包住
//
// 架構重點：
// - 定位邏輯通常使用 @floating-ui/react（推薦）或 popper.js
// - Trigger 的 aria-expanded 指向 open 狀態，aria-controls 指向 Content id
//
// 📖 參考：
// - Solid Signals: https://www.solidjs.com/docs/latest#createsignal
// - Solid Context: https://www.solidjs.com/docs/latest#createcontext
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/popover/
// - Zag.js 參考: https://zagjs.com/components/react/popover
// =============================================================================

export interface PopoverRootProps extends ParentProps {
  // TODO: 定義 props
}

export function PopoverRoot(props: PopoverRootProps) {
  // TODO: createSignal 管理狀態

  // TODO: 建立 context value

  // TODO: 渲染 Provider + div
  return null // ← 替換這行
}
