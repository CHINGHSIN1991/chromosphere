import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

// =============================================================================
// TODO: 實作 CollapsibleContent
// =============================================================================
//
// 這是可收合的內容區域，職責：
//   1. 從 Context 讀取 open 狀態
//   2. 根據狀態決定是否顯示內容
//   3. 加上正確的 ARIA 屬性
//
// 💡 提示：
//
// Step 1 — 從 Context 讀取狀態
//   使用 useCollapsibleContext 取得 open 狀態
//
// Step 2 — 條件渲染
//   最簡單的方式：open 為 false 時 return null
//   進階：可以用 hidden 屬性或 CSS 來隱藏（保留 DOM 節點）
//
// Step 3 — ARIA 無障礙屬性
//   <div> 需要以下屬性：
//   - id={contentId}              → 讓 Trigger 的 aria-controls 可以指向這裡
//   - role="region"               → 標記為一個區域
//   - data-state="open" | "closed" → CSS 樣式用
//
//   💡 思考：id 從哪裡來？
//      可以用 useId() 在 Root 生成，然後透過 Context 傳下來
//
// 📖 進階思考：
// - 如果要支援動畫，直接 return null 就不行了
//   需要用 CSS transition 或 height: 0 的方式來做
// - Ark UI 用了 lazyMount 和 unmountOnExit 來控制這個行為
// =============================================================================

export interface CollapsibleContentProps extends ComponentPropsWithoutRef<'div'> {
  // TODO: 需要額外的 props 嗎？
}

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  (props, ref) => {
    // TODO: 從 Context 讀取狀態

    // TODO: 條件渲染

    // TODO: 渲染 <div> 並加上 ARIA 屬性
    return null // ← 替換這行
  },
)

CollapsibleContent.displayName = 'CollapsibleContent'
