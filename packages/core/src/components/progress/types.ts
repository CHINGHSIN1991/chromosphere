// =============================================================================
// Progress Core Types
// =============================================================================
//
// 這個檔案定義了 Progress 元件的框架無關型別介面
// 每個 Framework Adapter（React/Vue/Solid/Svelte）應實作這些介面
//
// 元件說明：進度條元件
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/meter/
// - Zag.js Machine: https://zagjs.com/components/react/progress
// =============================================================================

/**
 * Progress 元件的 Anatomy（組成部分）
 * 列舉此元件包含的所有 parts
 */
export type ProgressPart = 'root' | 'label' | 'track' | 'range' | 'value-text'

/**
 * Progress 的 Context 狀態介面
 * Framework Adapter 的 Context 應包含這些欄位
 */
export interface ProgressContextValue {
  /** 目前進度值（null 表示 indeterminate） */
  value: number | null
  /** 最小值（預設 0） */
  min: number
  /** 最大值（預設 100） */
  max: number
}

/**
 * ProgressRoot 的 Props 介面
 */
export interface ProgressRootBaseProps {
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
 * Progress 的 Anatomy 定義
 * 每個 part 對應的 HTML 元素
 */
export const PROGRESS_ANATOMY = {
  /** 根容器，管理 value 狀態 */
  ROOT: 'div' as const,
  /** 進度條說明文字 */
  LABEL: 'label' as const,
  /** 進度條背景軌道 */
  TRACK: 'div' as const,
  /** 進度條填充部分（用 width 或 scaleX 實作） */
  RANGE: 'div' as const,
  /** 數值文字（如：75%） */
  VALUE_TEXT: 'span' as const,
} as const
