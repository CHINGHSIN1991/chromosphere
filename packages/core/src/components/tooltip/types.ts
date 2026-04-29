// =============================================================================
// Tooltip Core Types
// =============================================================================
//
// 這個檔案定義了 Tooltip 元件的框架無關型別介面
// 每個 Framework Adapter（React/Vue/Solid/Svelte）應實作這些介面
//
// 元件說明：工具提示，hover 或 focus 時顯示簡短說明
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
// - Zag.js Machine: https://zagjs.com/components/react/tooltip
// =============================================================================

/**
 * Tooltip 元件的 Anatomy（組成部分）
 * 列舉此元件包含的所有 parts
 */
export type TooltipPart = 'root' | 'trigger' | 'positioner' | 'content' | 'arrow' | 'arrow-tip'

/**
 * Tooltip 的 Context 狀態介面
 * Framework Adapter 的 Context 應包含這些欄位
 */
export interface TooltipContextValue {
  /** Tooltip 是否顯示 */
  open: boolean
  /** 控制顯示狀態 */
  setOpen: (open: boolean) => void
  /** Content 的 id（供 Trigger aria-describedby 使用） */
  contentId: string
}

/**
 * TooltipRoot 的 Props 介面
 */
export interface TooltipRootBaseProps {
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
 * Tooltip 的 Anatomy 定義
 * 每個 part 對應的 HTML 元素
 */
export const TOOLTIP_ANATOMY = {
  /** 根容器，管理 open 狀態 */
  ROOT: 'div' as const,
  /** 觸發 Tooltip 顯示的元素 */
  TRIGGER: 'button' as const,
  /** 定位容器 */
  POSITIONER: 'div' as const,
  /** Tooltip 內容（role="tooltip"） */
  CONTENT: 'div' as const,
  /** 箭頭容器 */
  ARROW: 'div' as const,
  /** 箭頭尖端 */
  ARROW_TIP: 'div' as const,
} as const
