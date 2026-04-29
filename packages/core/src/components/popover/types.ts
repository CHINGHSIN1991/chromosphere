// =============================================================================
// Popover Core Types
// =============================================================================
//
// 這個檔案定義了 Popover 元件的框架無關型別介面
// 每個 Framework Adapter（React/Vue/Solid/Svelte）應實作這些介面
//
// 元件說明：彈出式提示面板，通常需要定位邏輯
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/popover/
// - Zag.js Machine: https://zagjs.com/components/react/popover
// =============================================================================

/**
 * Popover 元件的 Anatomy（組成部分）
 * 列舉此元件包含的所有 parts
 */
export type PopoverPart = 'root' | 'trigger' | 'anchor' | 'positioner' | 'content' | 'title' | 'description' | 'close-trigger' | 'arrow' | 'arrow-tip'

/**
 * Popover 的 Context 狀態介面
 * Framework Adapter 的 Context 應包含這些欄位
 */
export interface PopoverContextValue {
  /** Popover 是否開啟 */
  open: boolean
  /** 控制 open 狀態 */
  setOpen: (open: boolean) => void
}

/**
 * PopoverRoot 的 Props 介面
 */
export interface PopoverRootBaseProps {
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
 * Popover 的 Anatomy 定義
 * 每個 part 對應的 HTML 元素
 */
export const POPOVER_ANATOMY = {
  /** 根容器，管理 open 狀態 */
  ROOT: 'div' as const,
  /** 觸發 Popover 的按鈕 */
  TRIGGER: 'button' as const,
  /** 定位錨點（選填，預設為 Trigger） */
  ANCHOR: 'div' as const,
  /** 定位容器（使用 floating-ui 或 popper.js） */
  POSITIONER: 'div' as const,
  /** Popover 主體（role="dialog"） */
  CONTENT: 'div' as const,
  /** Popover 標題 */
  TITLE: 'h3' as const,
  /** Popover 描述 */
  DESCRIPTION: 'p' as const,
  /** 關閉按鈕 */
  CLOSE_TRIGGER: 'button' as const,
  /** 箭頭容器 */
  ARROW: 'div' as const,
  /** 箭頭尖端（通常用 SVG 或 CSS transform） */
  ARROW_TIP: 'div' as const,
} as const
