import type { ParentProps } from 'solid-js'
import { createSignal } from 'solid-js'

// =============================================================================
// TODO: 實作 SelectRoot（Solid 版）
// =============================================================================
//
// 💡 Solid 與 React 的主要差異：
// - 狀態管理：createSignal 代替 useState
//   const [value, setValue] = createSignal(defaultValue)
// - 沒有 forwardRef：Solid 5 使用 ref prop 直接傳遞
// - Context：用 <SelectContext.Provider value={...}> 包住
//
// 架構重點：
// - Content 需要 role="listbox"，Item 需要 role="option"
// - Trigger 的 aria-haspopup="listbox"，aria-expanded 指向 open 狀態
//
// 📖 參考：
// - Solid Signals: https://www.solidjs.com/docs/latest#createsignal
// - Solid Context: https://www.solidjs.com/docs/latest#createcontext
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
// - Zag.js 參考: https://zagjs.com/components/react/select
// =============================================================================

export interface SelectRootProps extends ParentProps {
  // TODO: 定義 props
}

export function SelectRoot(props: SelectRootProps) {
  // TODO: createSignal 管理狀態

  // TODO: 建立 context value

  // TODO: 渲染 Provider + div
  return null // ← 替換這行
}
