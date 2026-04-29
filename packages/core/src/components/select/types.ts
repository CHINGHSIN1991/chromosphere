// =============================================================================
// Select Core Types
// =============================================================================
//
// 這個檔案定義了 Select 元件的框架無關型別介面
// 每個 Framework Adapter（React/Vue/Solid/Svelte）應實作這些介面
//
// 元件說明：下拉選單元件（自訂版本的 <select>）
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
// - Zag.js Machine: https://zagjs.com/components/react/select
// =============================================================================

/**
 * Select 元件的 Anatomy（組成部分）
 * 列舉此元件包含的所有 parts
 */
export type SelectPart = 'root' | 'label' | 'trigger' | 'value-text' | 'indicator' | 'positioner' | 'content' | 'item' | 'item-text' | 'item-indicator' | 'item-group' | 'item-group-label'

/**
 * Select 的 Context 狀態介面
 * Framework Adapter 的 Context 應包含這些欄位
 */
export interface SelectContextValue {
  /** 選中的值（支援單選和多選） */
  value: string | string[]
  /** 更新選中值 */
  setValue: (value: string | string[]) => void
  /** 下拉選單是否展開 */
  open: boolean
  /** 控制展開狀態 */
  setOpen: (open: boolean) => void
  /** 是否允許多選 */
  multiple: boolean
}

/**
 * SelectRoot 的 Props 介面
 */
export interface SelectRootBaseProps {
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
 * Select 的 Anatomy 定義
 * 每個 part 對應的 HTML 元素
 */
export const SELECT_ANATOMY = {
  /** 根容器，管理所有狀態 */
  ROOT: 'div' as const,
  /** 選單標籤 */
  LABEL: 'label' as const,
  /** 開啟選單的按鈕 */
  TRIGGER: 'button' as const,
  /** 顯示目前選中的值文字 */
  VALUE_TEXT: 'span' as const,
  /** 下拉箭頭圖示 */
  INDICATOR: 'span' as const,
  /** 下拉選單的定位容器 */
  POSITIONER: 'div' as const,
  /** 選項列表容器（role="listbox"） */
  CONTENT: 'div' as const,
  /** 單一選項（role="option"） */
  ITEM: 'div' as const,
  /** 選項文字 */
  ITEM_TEXT: 'span' as const,
  /** 選中狀態的勾選圖示 */
  ITEM_INDICATOR: 'span' as const,
  /** 選項分組容器（role="group"） */
  ITEM_GROUP: 'div' as const,
  /** 分組標籤 */
  ITEM_GROUP_LABEL: 'div' as const,
} as const
