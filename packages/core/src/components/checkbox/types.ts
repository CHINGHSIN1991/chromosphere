// =============================================================================
// Checkbox Core Types
// =============================================================================
//
// 這個檔案定義了 Checkbox 元件的框架無關型別介面
// 每個 Framework Adapter（React/Vue/Solid/Svelte）應實作這些介面
//
// 元件說明：勾選框元件
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
// - Zag.js Machine: https://zagjs.com/components/react/checkbox
// =============================================================================

/**
 * Checkbox 元件的 Anatomy（組成部分）
 * 列舉此元件包含的所有 parts
 */
export type CheckboxPart = 'root' | 'label' | 'control' | 'indicator' | 'hidden-input'

/**
 * Checkbox 的 Context 狀態介面
 * Framework Adapter 的 Context 應包含這些欄位
 */
export interface CheckboxContextValue {
  /** 勾選狀態（支援不確定狀態） */
  checked: boolean | "indeterminate"
  /** 更新狀態 */
  setChecked: (checked: boolean | "indeterminate") => void
  /** 是否禁用 */
  disabled: boolean
  /** HiddenInput 的 id */
  inputId: string
}

/**
 * CheckboxRoot 的 Props 介面
 */
export interface CheckboxRootBaseProps {
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
 * Checkbox 的 Anatomy 定義
 * 每個 part 對應的 HTML 元素
 */
export const CHECKBOX_ANATOMY = {
  /** 根容器（使用 label 可讓整個區域點擊觸發） */
  ROOT: 'label' as const,
  /** 勾選框的文字說明 */
  LABEL: 'span' as const,
  /** 視覺化的勾選框外框 */
  CONTROL: 'div' as const,
  /** 打勾標記（checked 時顯示） */
  INDICATOR: 'span' as const,
  /** 真實的 input[type="checkbox"]（視覺隱藏，供表單使用） */
  HIDDEN_INPUT: 'input' as const,
} as const
