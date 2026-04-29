// =============================================================================
// Tabs Core Types
// =============================================================================
//
// 這個檔案定義了 Tabs 元件的框架無關型別介面
// 每個 Framework Adapter（React/Vue/Solid/Svelte）應實作這些介面
//
// 元件說明：分頁標籤元件
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
// - Zag.js Machine: https://zagjs.com/components/react/tabs
// =============================================================================

/**
 * Tabs 元件的 Anatomy（組成部分）
 * 列舉此元件包含的所有 parts
 */
export type TabsPart = 'root' | 'list' | 'trigger' | 'content'

/**
 * Tabs 的 Context 狀態介面
 * Framework Adapter 的 Context 應包含這些欄位
 */
export interface TabsContextValue {
  /** 目前 active 的 tab value */
  value: string
  /** 切換 tab */
  setValue: (value: string) => void
}

/**
 * TabsRoot 的 Props 介面
 */
export interface TabsRootBaseProps {
  /** 非受控模式的預設值 */
  defaultValue?: unknown
  /** 受控模式的值 */
  value?: unknown
  /** 狀態改變時的回調 */
  onValueChange?: (value: unknown) => void
  /** 是否禁用整個元件 */
  disabled?: boolean
}

/**
 * Tabs 的 Anatomy 定義
 * 每個 part 對應的 HTML 元素
 */
export const TABS_ANATOMY = {
  /** 最外層容器，管理 active tab 狀態 */
  ROOT: 'div' as const,
  /** Tab 按鈕的列表容器（role="tablist"） */
  LIST: 'div' as const,
  /** 單一 tab 觸發按鈕（role="tab"） */
  TRIGGER: 'button' as const,
  /** Tab 對應的內容區域（role="tabpanel"） */
  CONTENT: 'div' as const,
} as const
