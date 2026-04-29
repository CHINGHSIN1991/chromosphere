import type { ParentProps } from 'solid-js'
import { createSignal } from 'solid-js'

// =============================================================================
// TODO: 實作 AccordionRoot（Solid 版）
// =============================================================================
//
// 💡 Solid 與 React 的主要差異：
// - 狀態管理：createSignal 代替 useState
//   const [value, setValue] = createSignal(defaultValue)
// - 沒有 forwardRef：Solid 5 使用 ref prop 直接傳遞
// - Context：用 <AccordionContext.Provider value={...}> 包住
//
// 架構重點：
// - 需要兩層 Context：AccordionContext（Root 層）和 AccordionItemContext（Item 層）
// - Root 的 value prop 可以是陣列，控制哪些 item 是展開的
//
// 📖 參考：
// - Solid Signals: https://www.solidjs.com/docs/latest#createsignal
// - Solid Context: https://www.solidjs.com/docs/latest#createcontext
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
// - Zag.js 參考: https://zagjs.com/components/react/accordion
// =============================================================================

export interface AccordionRootProps extends ParentProps {
  // TODO: 定義 props
}

export function AccordionRoot(props: AccordionRootProps) {
  // TODO: createSignal 管理狀態

  // TODO: 建立 context value

  // TODO: 渲染 Provider + div
  return null // ← 替換這行
}
