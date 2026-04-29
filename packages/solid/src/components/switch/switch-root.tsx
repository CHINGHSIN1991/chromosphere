import type { ParentProps } from 'solid-js'
import { createSignal } from 'solid-js'

// =============================================================================
// TODO: 實作 SwitchRoot（Solid 版）
// =============================================================================
//
// 💡 Solid 與 React 的主要差異：
// - 狀態管理：createSignal 代替 useState
//   const [value, setValue] = createSignal(defaultValue)
// - 沒有 forwardRef：Solid 5 使用 ref prop 直接傳遞
// - Context：用 <SwitchContext.Provider value={...}> 包住
//
// 架構重點：
// - 和 Checkbox 非常相似，但 HiddenInput 用 role="switch" 而非預設的 checkbox role
// - Switch 只有 on/off 兩種狀態（不像 Checkbox 有 indeterminate）
//
// 📖 參考：
// - Solid Signals: https://www.solidjs.com/docs/latest#createsignal
// - Solid Context: https://www.solidjs.com/docs/latest#createcontext
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/switch/
// - Zag.js 參考: https://zagjs.com/components/react/switch
// =============================================================================

export interface SwitchRootProps extends ParentProps {
  // TODO: 定義 props
}

export function SwitchRoot(props: SwitchRootProps) {
  // TODO: createSignal 管理狀態

  // TODO: 建立 context value

  // TODO: 渲染 Provider + div
  return null // ← 替換這行
}
