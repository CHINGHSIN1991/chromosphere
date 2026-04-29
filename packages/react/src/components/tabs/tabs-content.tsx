import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

// =============================================================================
// TODO: 實作 TabsContent
// =============================================================================
//
// 功能說明：Tab 對應的內容區域（role="tabpanel"）
//
// 💡 提示：
// Step 1 — 從 Context 讀取需要的狀態
//   使用 useTabsContext() 取得所需資料
//
// Step 2 — ARIA 無障礙屬性
//   參考 https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
//   決定此元素需要哪些 aria-* 和 role 屬性
//
// Step 3 — 事件處理
//   實作互動行為，並保留使用者傳入的 event handler
//   例：const handleClick = (e) => { props.onClick?.(e); doSomething() }
//
// Step 4 — data-* 屬性
//   加上 data-state、data-disabled 等屬性供 CSS 使用
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
// - Ark UI TabsContent 實作參考：
//   https://github.com/chakra-ui/ark/blob/main/packages/react/src/components/tabs/tabs-content.tsx
// =============================================================================

export interface TabsContentProps extends ComponentPropsWithoutRef<'div'> {
  // TODO: 是否需要額外的 props？
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  (props, ref) => {
    // TODO: 從 Context 讀取狀態
    // const { ... } = useTabsContext()

    // TODO: 實作邏輯

    // TODO: 渲染
    return null // ← 替換這行
  },
)

TabsContent.displayName = 'TabsContent'
