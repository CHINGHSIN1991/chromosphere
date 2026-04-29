// =============================================================================
// Avatar Core Types
// =============================================================================
//
// 這個檔案定義了 Avatar 元件的框架無關型別介面
// 每個 Framework Adapter（React/Vue/Solid/Svelte）應實作這些介面
//
// 元件說明：頭像元件，支援圖片載入失敗時顯示替代文字
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/
// - Zag.js Machine: https://zagjs.com/components/react/avatar
// =============================================================================

/**
 * Avatar 元件的 Anatomy（組成部分）
 * 列舉此元件包含的所有 parts
 */
export type AvatarPart = 'root' | 'image' | 'fallback'

/**
 * Avatar 的 Context 狀態介面
 * Framework Adapter 的 Context 應包含這些欄位
 */
export interface AvatarContextValue {
  /** 圖片載入狀態 */
  status: "loading" | "loaded" | "error"
  /** 更新載入狀態 */
  setStatus: (status: "loading" | "loaded" | "error") => void
}

/**
 * AvatarRoot 的 Props 介面
 */
export interface AvatarRootBaseProps {
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
 * Avatar 的 Anatomy 定義
 * 每個 part 對應的 HTML 元素
 */
export const AVATAR_ANATOMY = {
  /** 根容器，管理圖片載入狀態 */
  ROOT: 'div' as const,
  /** 頭像圖片（載入失敗時隱藏） */
  IMAGE: 'img' as const,
  /** 圖片載入失敗時顯示的替代內容（文字縮寫或圖示） */
  FALLBACK: 'span' as const,
} as const
