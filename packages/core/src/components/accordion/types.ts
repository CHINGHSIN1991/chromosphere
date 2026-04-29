// =============================================================================
// Accordion Core Types
// =============================================================================
//
// 這個檔案定義了 Accordion 元件的框架無關型別介面
// 每個 Framework Adapter（React/Vue/Solid/Svelte）應實作這些介面
//
// 元件說明：手風琴展開收合面板（多個可收合的內容區塊）
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
// - Zag.js Machine: https://zagjs.com/components/react/accordion
// =============================================================================

/**
 * Accordion 元件的 Anatomy（組成部分）
 * 列舉此元件包含的所有 parts
 */
export type AccordionPart = 'root' | 'item' | 'item-trigger' | 'item-content'

/**
 * Accordion 的 Context 狀態介面
 * Framework Adapter 的 Context 應包含這些欄位
 */
export interface AccordionContextValue {
  /** 目前展開的 item 值陣列 */
  value: string[]
  /** 更新展開狀態 */
  setValue: (value: string[]) => void
  /** 是否允許同時展開多個 item */
  multiple: boolean
}

/**
 * AccordionRoot 的 Props 介面
 */
export interface AccordionRootBaseProps {
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
 * Accordion 的 Anatomy 定義
 * 每個 part 對應的 HTML 元素
 */
export const ACCORDION_ANATOMY = {
  /** 最外層容器，管理整體狀態 */
  ROOT: 'div' as const,
  /** 單一手風琴項目，管理自身展開狀態 */
  ITEM: 'div' as const,
  /** 點擊觸發展開/收合 */
  ITEM_TRIGGER: 'button' as const,
  /** 可收合的內容區域 */
  ITEM_CONTENT: 'div' as const,
} as const
