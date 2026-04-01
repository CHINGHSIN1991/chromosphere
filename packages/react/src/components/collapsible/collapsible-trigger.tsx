import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

// =============================================================================
// TODO: 實作 CollapsibleTrigger
// =============================================================================
//
// 這是觸發展開/收合的按鈕，職責：
//   1. 從 Context 讀取 toggle 函式和 open 狀態
//   2. 點擊時呼叫 toggle
//   3. 加上正確的 ARIA 屬性
//
// 💡 提示：
//
// Step 1 — 從 Context 讀取狀態
//   使用你在 collapsible-context.ts 定義的 useCollapsibleContext
//
// Step 2 — ARIA 無障礙屬性
//   <button> 需要以下屬性：
//   - aria-expanded={open}        → 告訴螢幕閱讀器目前是展開還是收合
//   - aria-controls={contentId}   → 指向被控制的內容區域的 ID
//   - data-state="open" | "closed" → 讓 CSS 可以依狀態設定樣式
//   - disabled={disabled}         → 是否禁用
//
// Step 3 — 事件處理
//   - onClick → 呼叫 toggle（如果沒有 disabled）
//   💡 記得也要保留使用者傳入的 onClick！
//      const handleClick = (e) => {
//        props.onClick?.(e)  // 先呼叫使用者的
//        toggle()            // 再執行 toggle
//      }
//
// 📖 參考：
// - WAI-ARIA Disclosure Pattern:
//   https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
// =============================================================================

export interface CollapsibleTriggerProps extends ComponentPropsWithoutRef<'button'> {
  // TODO: 需要額外的 props 嗎？
}

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  (props, ref) => {
    // TODO: 從 Context 讀取狀態

    // TODO: 處理點擊事件

    // TODO: 渲染 <button> 並加上 ARIA 屬性
    return null // ← 替換這行
  },
)

CollapsibleTrigger.displayName = 'CollapsibleTrigger'
