// =============================================================================
// RadioGroup Core Types
// =============================================================================
//
// 這個檔案定義了 RadioGroup 元件的框架無關型別介面
// 每個 Framework Adapter（React/Vue/Solid/Svelte）應實作這些介面
//
// 元件說明：單選按鈕組
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/radio/
// - Zag.js Machine: https://zagjs.com/components/react/radio-group
// =============================================================================

/**
 * RadioGroup 元件的 Anatomy（組成部分）
 * 列舉此元件包含的所有 parts
 */
export type RadioGroupPart = 'root' | 'label' | 'item' | 'item-control' | 'item-text' | 'item-hidden-input'

/**
 * RadioGroup 的 Context 狀態介面
 * Framework Adapter 的 Context 應包含這些欄位
 */
export interface RadioGroupContextValue {
  /** 目前選中的值 */
  value: string
  /** 更新選中值 */
  setValue: (value: string) => void
  /** 表單欄位名稱（供 input[name] 使用） */
  name: string
}

/**
 * RadioGroupRoot 的 Props 介面
 */
export interface RadioGroupRootBaseProps {
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
 * RadioGroup 的 Anatomy 定義
 * 每個 part 對應的 HTML 元素
 */
export const RADIOGROUP_ANATOMY = {
  /** 根容器（role="radiogroup"） */
  ROOT: 'div' as const,
  /** 整組的標籤 */
  LABEL: 'label' as const,
  /** 單一選項的容器（使用 label 包住） */
  ITEM: 'label' as const,
  /** 視覺化的圓形按鈕 */
  ITEM_CONTROL: 'div' as const,
  /** 選項文字 */
  ITEM_TEXT: 'span' as const,
  /** 底層的 input[type="radio"] */
  ITEM_HIDDEN_INPUT: 'input' as const,
} as const
