import type { ParentProps } from 'solid-js'
import { createSignal } from 'solid-js'

// =============================================================================
// TODO: 實作 TabsRoot（Solid 版）
// =============================================================================
//
// 💡 Solid 與 React 的主要差異：
// - 狀態管理：createSignal 代替 useState
//   const [value, setValue] = createSignal(defaultValue)
// - 沒有 forwardRef：Solid 5 使用 ref prop 直接傳遞
// - Context：用 <TabsContext.Provider value={...}> 包住
//
// 架構重點：
// - List 需要 role="tablist"，Trigger 需要 role="tab"，Content 需要 role="tabpanel"
// - Trigger 的 aria-selected 要根據是否為 active tab 設定
//
// 📖 參考：
// - Solid Signals: https://www.solidjs.com/docs/latest#createsignal
// - Solid Context: https://www.solidjs.com/docs/latest#createcontext
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
// - Zag.js 參考: https://zagjs.com/components/react/tabs
// =============================================================================

export interface TabsRootProps extends ParentProps {
  // TODO: 定義 props
}

export function TabsRoot(props: TabsRootProps) {
  // TODO: createSignal 管理狀態

  // TODO: 建立 context value

  // TODO: 渲染 Provider + div
  return null // ← 替換這行
}
