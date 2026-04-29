// =============================================================================
// Switch Core Types
// =============================================================================
//
// 這個檔案定義了 Switch 元件的框架無關型別介面
// 每個 Framework Adapter（React/Vue/Solid/Svelte）應實作這些介面
//
// 元件說明：開關切換元件（像手機的開關按鈕）
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/switch/
// - Zag.js Machine: https://zagjs.com/components/react/switch
// =============================================================================

/**
 * Switch 元件的 Anatomy（組成部分）
 * 列舉此元件包含的所有 parts
 */
export type SwitchPart = 'root' | 'label' | 'control' | 'thumb' | 'hidden-input'

/**
 * Switch 的 Context 狀態介面
 * Framework Adapter 的 Context 應包含這些欄位
 */
export interface SwitchContextValue {
  /** 開關狀態 */
  checked: boolean
  /** 切換狀態 */
  setChecked: (checked: boolean) => void
  /** 是否禁用 */
  disabled: boolean
}

/**
 * SwitchRoot 的 Props 介面
 */
export interface SwitchRootBaseProps {
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
 * Switch 的 Anatomy 定義
 * 每個 part 對應的 HTML 元素
 */
export const SWITCH_ANATOMY = {
  /** 根容器 */
  ROOT: 'label' as const,
  /** 說明文字 */
  LABEL: 'span' as const,
  /** 視覺化的開關軌道 */
  CONTROL: 'span' as const,
  /** 滑動的圓形按鈕 */
  THUMB: 'span' as const,
  /** 底層的 input[type="checkbox" role="switch"] */
  HIDDEN_INPUT: 'input' as const,
} as const
