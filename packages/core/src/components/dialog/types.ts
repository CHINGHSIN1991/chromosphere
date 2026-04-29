// =============================================================================
// Dialog Core Types
// =============================================================================
//
// 這個檔案定義了 Dialog 元件的框架無關型別介面
// 每個 Framework Adapter（React/Vue/Solid/Svelte）應實作這些介面
//
// 元件說明：對話框 / 彈窗元件
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
// - Zag.js Machine: https://zagjs.com/components/react/dialog
// =============================================================================

/**
 * Dialog 元件的 Anatomy（組成部分）
 * 列舉此元件包含的所有 parts
 */
export type DialogPart = 'root' | 'trigger' | 'backdrop' | 'positioner' | 'content' | 'title' | 'description' | 'close-trigger'

/**
 * Dialog 的 Context 狀態介面
 * Framework Adapter 的 Context 應包含這些欄位
 */
export interface DialogContextValue {
  /** Dialog 是否開啟 */
  open: boolean
  /** 控制 open 狀態 */
  setOpen: (open: boolean) => void
  /** Dialog content 的唯一 id（供 ARIA 使用） */
  contentId: string
  /** Dialog title 的唯一 id */
  titleId: string
  /** Dialog description 的唯一 id */
  descriptionId: string
}

/**
 * DialogRoot 的 Props 介面
 */
export interface DialogRootBaseProps {
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
 * Dialog 的 Anatomy 定義
 * 每個 part 對應的 HTML 元素
 */
export const DIALOG_ANATOMY = {
  /** 根容器，管理 open 狀態 */
  ROOT: 'div' as const,
  /** 開啟 Dialog 的按鈕 */
  TRIGGER: 'button' as const,
  /** 背景遮罩（點擊可關閉） */
  BACKDROP: 'div' as const,
  /** Dialog 定位容器（通常是 fixed/absolute） */
  POSITIONER: 'div' as const,
  /** Dialog 主體內容（role="dialog"） */
  CONTENT: 'div' as const,
  /** Dialog 標題（aria-labelledby 的目標） */
  TITLE: 'h2' as const,
  /** Dialog 描述（aria-describedby 的目標） */
  DESCRIPTION: 'p' as const,
  /** 關閉 Dialog 的按鈕 */
  CLOSE_TRIGGER: 'button' as const,
} as const
