// =============================================================================
// Anatomy 定義
// =============================================================================
//
// Anatomy 定義了每個元件由哪些 "parts" 組成
// 這通常用來：
//   1. 自動生成 data-part 屬性（讓 CSS 可以精準選取元件的各部分）
//   2. 作為文件和規格的單一事實來源
//
// 💡 Ark UI 使用 @zag-js/anatomy 套件做這件事
//    範例：https://github.com/zag-js/zag/tree/main/packages/utilities/anatomy
//
// 📖 參考：
// - Zag.js Anatomy: https://github.com/zag-js/zag/tree/main/packages/utilities/anatomy
// - Ark UI 使用方式：grep for 'anatomy' in chakra-ui/ark
// =============================================================================

// 手風琴展開收合面板（多個可收合的內容區塊）
export const ACCORDION_ANATOMY = ['root', 'item', 'item-trigger', 'item-content'] as const
export type AccordionAnatomy = typeof ACCORDION_ANATOMY[number]

// 分頁標籤元件
export const TABS_ANATOMY = ['root', 'list', 'trigger', 'content'] as const
export type TabsAnatomy = typeof TABS_ANATOMY[number]

// 對話框 / 彈窗元件
export const DIALOG_ANATOMY = ['root', 'trigger', 'backdrop', 'positioner', 'content', 'title', 'description', 'close-trigger'] as const
export type DialogAnatomy = typeof DIALOG_ANATOMY[number]

// 彈出式提示面板，通常需要定位邏輯
export const POPOVER_ANATOMY = ['root', 'trigger', 'anchor', 'positioner', 'content', 'title', 'description', 'close-trigger', 'arrow', 'arrow-tip'] as const
export type PopoverAnatomy = typeof POPOVER_ANATOMY[number]

// 工具提示，hover 或 focus 時顯示簡短說明
export const TOOLTIP_ANATOMY = ['root', 'trigger', 'positioner', 'content', 'arrow', 'arrow-tip'] as const
export type TooltipAnatomy = typeof TOOLTIP_ANATOMY[number]

// 勾選框元件
export const CHECKBOX_ANATOMY = ['root', 'label', 'control', 'indicator', 'hidden-input'] as const
export type CheckboxAnatomy = typeof CHECKBOX_ANATOMY[number]

// 開關切換元件（像手機的開關按鈕）
export const SWITCH_ANATOMY = ['root', 'label', 'control', 'thumb', 'hidden-input'] as const
export type SwitchAnatomy = typeof SWITCH_ANATOMY[number]

// 下拉選單元件（自訂版本的 <select>）
export const SELECT_ANATOMY = ['root', 'label', 'trigger', 'value-text', 'indicator', 'positioner', 'content', 'item', 'item-text', 'item-indicator', 'item-group', 'item-group-label'] as const
export type SelectAnatomy = typeof SELECT_ANATOMY[number]

// 單選按鈕組
export const RADIO_GROUP_ANATOMY = ['root', 'label', 'item', 'item-control', 'item-text', 'item-hidden-input'] as const
export type RadioGroupAnatomy = typeof RADIO_GROUP_ANATOMY[number]

// 頭像元件，支援圖片載入失敗時顯示替代文字
export const AVATAR_ANATOMY = ['root', 'image', 'fallback'] as const
export type AvatarAnatomy = typeof AVATAR_ANATOMY[number]

// 進度條元件
export const PROGRESS_ANATOMY = ['root', 'label', 'track', 'range', 'value-text'] as const
export type ProgressAnatomy = typeof PROGRESS_ANATOMY[number]
