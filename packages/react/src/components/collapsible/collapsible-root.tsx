import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

// =============================================================================
// TODO: 實作 CollapsibleRoot
// =============================================================================
//
// 這是 Collapsible 元件的最外層容器，職責：
//   1. 管理 open/close 狀態
//   2. 透過 Context Provider 把狀態分享給子元件
//   3. 渲染一個 <div> 包住所有子元件
//
// 💡 提示：
//
// Step 1 — Props 設計
//   思考這個元件需要接受哪些 props？
//   - children（子元件）
//   - defaultOpen?（預設是否展開 → 非受控模式）
//   - open?（外部控制的展開狀態 → 受控模式）
//   - onOpenChange?（狀態改變時的回調）
//   - disabled?（是否禁用）
//   - ...其他 HTML div 的原生屬性
//
// Step 2 — 狀態管理
//   用 useState 管理 open 狀態
//   💡 想想受控 vs 非受控模式怎麼處理？
//      - 如果使用者傳了 `open` prop → 用使用者的值（受控）
//      - 如果沒傳 → 用內部 state（非受控）
//
// Step 3 — Context Provider
//   把 open 狀態和相關函式塞進 Context Provider
//
// Step 4 — 渲染
//   渲染 <div> 並加上 data-state="open" | "closed"
//   （這讓使用者可以用 CSS selector [data-state="open"] 來設定樣式）
//
// 📖 參考：
// - forwardRef: https://react.dev/reference/react/forwardRef
// - Controlled vs Uncontrolled: https://react.dev/learn/sharing-state-between-components
// =============================================================================

export interface CollapsibleRootProps extends ComponentPropsWithoutRef<'div'> {
  // TODO: 定義 props
}

export const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleRootProps>(
  (props, ref) => {
    // TODO: 解構 props

    // TODO: 管理 open 狀態

    // TODO: 建立 Context value

    // TODO: 渲染 Provider + div
    return null // ← 替換這行
  },
)

CollapsibleRoot.displayName = 'CollapsibleRoot'
