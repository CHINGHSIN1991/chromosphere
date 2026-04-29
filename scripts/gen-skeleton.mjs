#!/usr/bin/env node
/**
 * 架構骨架生成腳本
 * 為所有元件和框架生成帶有 hints 和 resources 的空實作檔案
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// ============================================================
// 元件定義
// ============================================================

const components = [
  {
    name: 'accordion',
    PascalName: 'Accordion',
    description: '手風琴展開收合面板（多個可收合的內容區塊）',
    complexity: 'medium',
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/',
    zagMachine: 'https://zagjs.com/components/react/accordion',
    parts: [
      { name: 'root', PascalName: 'Root', element: 'div', desc: '最外層容器，管理整體狀態' },
      { name: 'item', PascalName: 'Item', element: 'div', desc: '單一手風琴項目，管理自身展開狀態' },
      { name: 'item-trigger', PascalName: 'ItemTrigger', element: 'button', desc: '點擊觸發展開/收合' },
      { name: 'item-content', PascalName: 'ItemContent', element: 'div', desc: '可收合的內容區域' },
    ],
    contextFields: [
      { name: 'value', type: 'string[]', desc: '目前展開的 item 值陣列' },
      { name: 'setValue', type: '(value: string[]) => void', desc: '更新展開狀態' },
      { name: 'multiple', type: 'boolean', desc: '是否允許同時展開多個 item' },
    ],
    itemContextFields: [
      { name: 'value', type: 'string', desc: '此 item 的唯一識別值' },
      { name: 'isOpen', type: 'boolean', desc: '此 item 是否展開' },
    ],
    keyHints: [
      '需要兩層 Context：AccordionContext（Root 層）和 AccordionItemContext（Item 層）',
      'Root 的 value prop 可以是陣列，控制哪些 item 是展開的',
      'ItemTrigger 的 aria-expanded 要根據自身 item 的狀態設定',
      'ItemTrigger 的 aria-controls 要指向對應的 ItemContent 的 id',
    ],
  },
  {
    name: 'tabs',
    PascalName: 'Tabs',
    description: '分頁標籤元件',
    complexity: 'medium',
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/tabs/',
    zagMachine: 'https://zagjs.com/components/react/tabs',
    parts: [
      { name: 'root', PascalName: 'Root', element: 'div', desc: '最外層容器，管理 active tab 狀態' },
      { name: 'list', PascalName: 'List', element: 'div', desc: 'Tab 按鈕的列表容器（role="tablist"）' },
      { name: 'trigger', PascalName: 'Trigger', element: 'button', desc: '單一 tab 觸發按鈕（role="tab"）' },
      { name: 'content', PascalName: 'Content', element: 'div', desc: 'Tab 對應的內容區域（role="tabpanel"）' },
    ],
    contextFields: [
      { name: 'value', type: 'string', desc: '目前 active 的 tab value' },
      { name: 'setValue', type: '(value: string) => void', desc: '切換 tab' },
    ],
    keyHints: [
      'List 需要 role="tablist"，Trigger 需要 role="tab"，Content 需要 role="tabpanel"',
      'Trigger 的 aria-selected 要根據是否為 active tab 設定',
      'Trigger 的 aria-controls 要指向對應 Content 的 id',
      'Content 的 aria-labelledby 要指向對應 Trigger 的 id',
      '鍵盤導航：Left/Right 箭頭鍵切換 tab（重要！）',
    ],
  },
  {
    name: 'dialog',
    PascalName: 'Dialog',
    description: '對話框 / 彈窗元件',
    complexity: 'hard',
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
    zagMachine: 'https://zagjs.com/components/react/dialog',
    parts: [
      { name: 'root', PascalName: 'Root', element: 'div', desc: '根容器，管理 open 狀態' },
      { name: 'trigger', PascalName: 'Trigger', element: 'button', desc: '開啟 Dialog 的按鈕' },
      { name: 'backdrop', PascalName: 'Backdrop', element: 'div', desc: '背景遮罩（點擊可關閉）' },
      { name: 'positioner', PascalName: 'Positioner', element: 'div', desc: 'Dialog 定位容器（通常是 fixed/absolute）' },
      { name: 'content', PascalName: 'Content', element: 'div', desc: 'Dialog 主體內容（role="dialog"）' },
      { name: 'title', PascalName: 'Title', element: 'h2', desc: 'Dialog 標題（aria-labelledby 的目標）' },
      { name: 'description', PascalName: 'Description', element: 'p', desc: 'Dialog 描述（aria-describedby 的目標）' },
      { name: 'close-trigger', PascalName: 'CloseTrigger', element: 'button', desc: '關閉 Dialog 的按鈕' },
    ],
    contextFields: [
      { name: 'open', type: 'boolean', desc: 'Dialog 是否開啟' },
      { name: 'setOpen', type: '(open: boolean) => void', desc: '控制 open 狀態' },
      { name: 'contentId', type: 'string', desc: 'Dialog content 的唯一 id（供 ARIA 使用）' },
      { name: 'titleId', type: 'string', desc: 'Dialog title 的唯一 id' },
      { name: 'descriptionId', type: 'string', desc: 'Dialog description 的唯一 id' },
    ],
    keyHints: [
      'Content 需要 role="dialog"、aria-modal="true"',
      'Content 的 aria-labelledby 指向 Title 的 id，aria-describedby 指向 Description 的 id',
      'Focus trap：Dialog 開啟時焦點應限制在 Content 內（重要的無障礙需求）',
      'ESC 鍵應關閉 Dialog',
      '通常使用 Portal 把 Dialog 掛在 body 下，避免 z-index 問題',
      'Backdrop 點擊應關閉 Dialog（但要考慮是否有 closeOnBackdropClick prop）',
    ],
  },
  {
    name: 'popover',
    PascalName: 'Popover',
    description: '彈出式提示面板，通常需要定位邏輯',
    complexity: 'hard',
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/popover/',
    zagMachine: 'https://zagjs.com/components/react/popover',
    parts: [
      { name: 'root', PascalName: 'Root', element: 'div', desc: '根容器，管理 open 狀態' },
      { name: 'trigger', PascalName: 'Trigger', element: 'button', desc: '觸發 Popover 的按鈕' },
      { name: 'anchor', PascalName: 'Anchor', element: 'div', desc: '定位錨點（選填，預設為 Trigger）' },
      { name: 'positioner', PascalName: 'Positioner', element: 'div', desc: '定位容器（使用 floating-ui 或 popper.js）' },
      { name: 'content', PascalName: 'Content', element: 'div', desc: 'Popover 主體（role="dialog"）' },
      { name: 'title', PascalName: 'Title', element: 'h3', desc: 'Popover 標題' },
      { name: 'description', PascalName: 'Description', element: 'p', desc: 'Popover 描述' },
      { name: 'close-trigger', PascalName: 'CloseTrigger', element: 'button', desc: '關閉按鈕' },
      { name: 'arrow', PascalName: 'Arrow', element: 'div', desc: '箭頭容器' },
      { name: 'arrow-tip', PascalName: 'ArrowTip', element: 'div', desc: '箭頭尖端（通常用 SVG 或 CSS transform）' },
    ],
    contextFields: [
      { name: 'open', type: 'boolean', desc: 'Popover 是否開啟' },
      { name: 'setOpen', type: '(open: boolean) => void', desc: '控制 open 狀態' },
    ],
    keyHints: [
      '定位邏輯通常使用 @floating-ui/react（推薦）或 popper.js',
      'Trigger 的 aria-expanded 指向 open 狀態，aria-controls 指向 Content id',
      'ESC 鍵應關閉 Popover',
      'Click outside 應關閉 Popover（需要 useOutsideClick hook）',
      '比 Tooltip 複雜：Popover 可以包含互動元素，Tooltip 只顯示純文字',
    ],
  },
  {
    name: 'tooltip',
    PascalName: 'Tooltip',
    description: '工具提示，hover 或 focus 時顯示簡短說明',
    complexity: 'medium',
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/',
    zagMachine: 'https://zagjs.com/components/react/tooltip',
    parts: [
      { name: 'root', PascalName: 'Root', element: 'div', desc: '根容器，管理 open 狀態' },
      { name: 'trigger', PascalName: 'Trigger', element: 'button', desc: '觸發 Tooltip 顯示的元素' },
      { name: 'positioner', PascalName: 'Positioner', element: 'div', desc: '定位容器' },
      { name: 'content', PascalName: 'Content', element: 'div', desc: 'Tooltip 內容（role="tooltip"）' },
      { name: 'arrow', PascalName: 'Arrow', element: 'div', desc: '箭頭容器' },
      { name: 'arrow-tip', PascalName: 'ArrowTip', element: 'div', desc: '箭頭尖端' },
    ],
    contextFields: [
      { name: 'open', type: 'boolean', desc: 'Tooltip 是否顯示' },
      { name: 'setOpen', type: '(open: boolean) => void', desc: '控制顯示狀態' },
      { name: 'contentId', type: 'string', desc: 'Content 的 id（供 Trigger aria-describedby 使用）' },
    ],
    keyHints: [
      'Trigger 的 aria-describedby 指向 Content 的 id',
      'Content 需要 role="tooltip"',
      'Tooltip 由 hover 或 focus 觸發（不是 click）',
      '需要考慮 delay（openDelay, closeDelay）避免閃爍',
      'Tooltip 不應包含互動元素（按鈕、連結等），若需要請改用 Popover',
    ],
  },
  {
    name: 'checkbox',
    PascalName: 'Checkbox',
    description: '勾選框元件',
    complexity: 'medium',
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/',
    zagMachine: 'https://zagjs.com/components/react/checkbox',
    parts: [
      { name: 'root', PascalName: 'Root', element: 'label', desc: '根容器（使用 label 可讓整個區域點擊觸發）' },
      { name: 'label', PascalName: 'Label', element: 'span', desc: '勾選框的文字說明' },
      { name: 'control', PascalName: 'Control', element: 'div', desc: '視覺化的勾選框外框' },
      { name: 'indicator', PascalName: 'Indicator', element: 'span', desc: '打勾標記（checked 時顯示）' },
      { name: 'hidden-input', PascalName: 'HiddenInput', element: 'input', desc: '真實的 input[type="checkbox"]（視覺隱藏，供表單使用）' },
    ],
    contextFields: [
      { name: 'checked', type: 'boolean | "indeterminate"', desc: '勾選狀態（支援不確定狀態）' },
      { name: 'setChecked', type: '(checked: boolean | "indeterminate") => void', desc: '更新狀態' },
      { name: 'disabled', type: 'boolean', desc: '是否禁用' },
      { name: 'inputId', type: 'string', desc: 'HiddenInput 的 id' },
    ],
    keyHints: [
      'Control + Indicator 是視覺層，HiddenInput 是語義/表單層（兩者都需要）',
      '支援 indeterminate（不確定）狀態：data-state="indeterminate"',
      'Root 使用 label 元素，點擊 label 自動 toggle HiddenInput',
      'HiddenInput 要用 CSS 隱藏但不能用 display:none（螢幕閱讀器需要它）',
      'checked prop（受控）vs defaultChecked（非受控）',
    ],
  },
  {
    name: 'switch',
    PascalName: 'Switch',
    description: '開關切換元件（像手機的開關按鈕）',
    complexity: 'easy',
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/switch/',
    zagMachine: 'https://zagjs.com/components/react/switch',
    parts: [
      { name: 'root', PascalName: 'Root', element: 'label', desc: '根容器' },
      { name: 'label', PascalName: 'Label', element: 'span', desc: '說明文字' },
      { name: 'control', PascalName: 'Control', element: 'span', desc: '視覺化的開關軌道' },
      { name: 'thumb', PascalName: 'Thumb', element: 'span', desc: '滑動的圓形按鈕' },
      { name: 'hidden-input', PascalName: 'HiddenInput', element: 'input', desc: '底層的 input[type="checkbox" role="switch"]' },
    ],
    contextFields: [
      { name: 'checked', type: 'boolean', desc: '開關狀態' },
      { name: 'setChecked', type: '(checked: boolean) => void', desc: '切換狀態' },
      { name: 'disabled', type: 'boolean', desc: '是否禁用' },
    ],
    keyHints: [
      '和 Checkbox 非常相似，但 HiddenInput 用 role="switch" 而非預設的 checkbox role',
      'Switch 只有 on/off 兩種狀態（不像 Checkbox 有 indeterminate）',
      'Control + Thumb 是視覺層，用 CSS transform 做滑動動畫',
      'data-state="checked" | "unchecked" 供 CSS 使用',
    ],
  },
  {
    name: 'select',
    PascalName: 'Select',
    description: '下拉選單元件（自訂版本的 <select>）',
    complexity: 'hard',
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/',
    zagMachine: 'https://zagjs.com/components/react/select',
    parts: [
      { name: 'root', PascalName: 'Root', element: 'div', desc: '根容器，管理所有狀態' },
      { name: 'label', PascalName: 'Label', element: 'label', desc: '選單標籤' },
      { name: 'trigger', PascalName: 'Trigger', element: 'button', desc: '開啟選單的按鈕' },
      { name: 'value-text', PascalName: 'ValueText', element: 'span', desc: '顯示目前選中的值文字' },
      { name: 'indicator', PascalName: 'Indicator', element: 'span', desc: '下拉箭頭圖示' },
      { name: 'positioner', PascalName: 'Positioner', element: 'div', desc: '下拉選單的定位容器' },
      { name: 'content', PascalName: 'Content', element: 'div', desc: '選項列表容器（role="listbox"）' },
      { name: 'item', PascalName: 'Item', element: 'div', desc: '單一選項（role="option"）' },
      { name: 'item-text', PascalName: 'ItemText', element: 'span', desc: '選項文字' },
      { name: 'item-indicator', PascalName: 'ItemIndicator', element: 'span', desc: '選中狀態的勾選圖示' },
      { name: 'item-group', PascalName: 'ItemGroup', element: 'div', desc: '選項分組容器（role="group"）' },
      { name: 'item-group-label', PascalName: 'ItemGroupLabel', element: 'div', desc: '分組標籤' },
    ],
    contextFields: [
      { name: 'value', type: 'string | string[]', desc: '選中的值（支援單選和多選）' },
      { name: 'setValue', type: '(value: string | string[]) => void', desc: '更新選中值' },
      { name: 'open', type: 'boolean', desc: '下拉選單是否展開' },
      { name: 'setOpen', type: '(open: boolean) => void', desc: '控制展開狀態' },
      { name: 'multiple', type: 'boolean', desc: '是否允許多選' },
    ],
    keyHints: [
      'Content 需要 role="listbox"，Item 需要 role="option"',
      'Trigger 的 aria-haspopup="listbox"，aria-expanded 指向 open 狀態',
      '鍵盤導航：Up/Down 移動焦點，Enter/Space 選取，Escape 關閉',
      '選中的 Item 需要 aria-selected="true"',
      '這是最複雜的元件之一，建議先完成簡單元件再來挑戰',
    ],
  },
  {
    name: 'radio-group',
    PascalName: 'RadioGroup',
    description: '單選按鈕組',
    complexity: 'medium',
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/radio/',
    zagMachine: 'https://zagjs.com/components/react/radio-group',
    parts: [
      { name: 'root', PascalName: 'Root', element: 'div', desc: '根容器（role="radiogroup"）' },
      { name: 'label', PascalName: 'Label', element: 'label', desc: '整組的標籤' },
      { name: 'item', PascalName: 'Item', element: 'label', desc: '單一選項的容器（使用 label 包住）' },
      { name: 'item-control', PascalName: 'ItemControl', element: 'div', desc: '視覺化的圓形按鈕' },
      { name: 'item-text', PascalName: 'ItemText', element: 'span', desc: '選項文字' },
      { name: 'item-hidden-input', PascalName: 'ItemHiddenInput', element: 'input', desc: '底層的 input[type="radio"]' },
    ],
    contextFields: [
      { name: 'value', type: 'string', desc: '目前選中的值' },
      { name: 'setValue', type: '(value: string) => void', desc: '更新選中值' },
      { name: 'name', type: 'string', desc: '表單欄位名稱（供 input[name] 使用）' },
    ],
    keyHints: [
      'Root 需要 role="radiogroup"，ItemHiddenInput 用 type="radio"',
      '和 Checkbox 類似，但一次只能選一個',
      '鍵盤導航：Up/Down 或 Left/Right 在選項間移動並自動選取',
      '同一組的 radio input 需要有相同的 name 屬性',
    ],
  },
  {
    name: 'avatar',
    PascalName: 'Avatar',
    description: '頭像元件，支援圖片載入失敗時顯示替代文字',
    complexity: 'easy',
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/',
    zagMachine: 'https://zagjs.com/components/react/avatar',
    parts: [
      { name: 'root', PascalName: 'Root', element: 'div', desc: '根容器，管理圖片載入狀態' },
      { name: 'image', PascalName: 'Image', element: 'img', desc: '頭像圖片（載入失敗時隱藏）' },
      { name: 'fallback', PascalName: 'Fallback', element: 'span', desc: '圖片載入失敗時顯示的替代內容（文字縮寫或圖示）' },
    ],
    contextFields: [
      { name: 'status', type: '"loading" | "loaded" | "error"', desc: '圖片載入狀態' },
      { name: 'setStatus', type: '(status: "loading" | "loaded" | "error") => void', desc: '更新載入狀態' },
    ],
    keyHints: [
      '圖片載入狀態機：loading → loaded（onLoad）或 loading → error（onError）',
      'Image 的 onLoad 和 onError 事件更新 Context 中的狀態',
      'Fallback 在 status === "error" 或 status === "loading" 時顯示',
      '這是最簡單的有狀態元件，適合練手',
    ],
  },
  {
    name: 'progress',
    PascalName: 'Progress',
    description: '進度條元件',
    complexity: 'easy',
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/meter/',
    zagMachine: 'https://zagjs.com/components/react/progress',
    parts: [
      { name: 'root', PascalName: 'Root', element: 'div', desc: '根容器，管理 value 狀態' },
      { name: 'label', PascalName: 'Label', element: 'label', desc: '進度條說明文字' },
      { name: 'track', PascalName: 'Track', element: 'div', desc: '進度條背景軌道' },
      { name: 'range', PascalName: 'Range', element: 'div', desc: '進度條填充部分（用 width 或 scaleX 實作）' },
      { name: 'value-text', PascalName: 'ValueText', element: 'span', desc: '數值文字（如：75%）' },
    ],
    contextFields: [
      { name: 'value', type: 'number | null', desc: '目前進度值（null 表示 indeterminate）' },
      { name: 'min', type: 'number', desc: '最小值（預設 0）' },
      { name: 'max', type: 'number', desc: '最大值（預設 100）' },
    ],
    keyHints: [
      'Root 可以渲染一個 div 但要加上 role="progressbar"',
      'aria-valuenow={value}、aria-valuemin={min}、aria-valuemax={max}',
      'value=null 表示 indeterminate（不確定進度），此時 CSS 做循環動畫',
      'Range 的寬度計算：((value - min) / (max - min)) * 100 + "%"',
    ],
  },
]

// ============================================================
// 工具函式
// ============================================================

function toPascalCase(str) {
  return str
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

function toKebabCase(str) {
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath))
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf8')
    console.log(`  ✅ Created: ${path.relative(ROOT, filePath)}`)
  } else {
    console.log(`  ⏭️  Skipped (exists): ${path.relative(ROOT, filePath)}`)
  }
}

// ============================================================
// React 模板生成
// ============================================================

function genReactContext(comp) {
  const { name, PascalName, contextFields, keyHints } = comp
  return `import { createContext, useContext } from 'react'

// =============================================================================
// TODO: 定義 ${PascalName} 的 Context
// =============================================================================
//
// 💡 提示：
// 1. 定義 Context 的形狀（${PascalName}ContextValue interface）
// 2. 用 createContext 建立 Context（預設值設為 null）
// 3. 建立 use${PascalName}Context hook，加上防護性錯誤處理
//
// Context 需要包含的欄位：
${contextFields.map(f => `//   - ${f.name}: ${f.type}  →  ${f.desc}`).join('\n')}
//
// 📖 參考：
// - createContext: https://react.dev/reference/react/createContext
// - Ark UI 自訂 createContext 範例：https://github.com/chakra-ui/ark/blob/main/packages/react/src/utils/create-context.ts
// =============================================================================

// TODO: 定義 ${PascalName}ContextValue interface
// export interface ${PascalName}ContextValue {
${contextFields.map(f => `//   ${f.name}: ${f.type}`).join('\n')}
// }

// TODO: 建立 Context
// export const ${PascalName}Context = createContext<${PascalName}ContextValue | null>(null)

// TODO: 建立 use${PascalName}Context hook
// export function use${PascalName}Context(): ${PascalName}ContextValue {
//   const context = useContext(${PascalName}Context)
//   if (!context) {
//     throw new Error('use${PascalName}Context must be used within <${PascalName}.Root>')
//   }
//   return context
// }
`
}

function genReactRoot(comp) {
  const { name, PascalName, keyHints, ariaPattern, zagMachine } = comp
  return `import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

// =============================================================================
// TODO: 實作 ${PascalName}Root
// =============================================================================
//
// 這是 ${PascalName} 的根容器，職責：
//   1. 接受 props（受控 value + 非受控 defaultValue）
//   2. 用 useState 管理內部狀態
//   3. 透過 Context Provider 把狀態傳遞給子元件
//   4. 渲染 <div> 並加上適當的 data-state 屬性
//
// 💡 架構重點：
${keyHints.slice(0, 3).map(h => `//   - ${h}`).join('\n')}
//
// 📖 參考：
// - forwardRef: https://react.dev/reference/react/forwardRef
// - 受控 vs 非受控: https://react.dev/learn/sharing-state-between-components
// - ARIA Pattern: ${ariaPattern}
// - Zag.js 狀態機參考: ${zagMachine}
// =============================================================================

export interface ${PascalName}RootProps extends ComponentPropsWithoutRef<'div'> {
  // TODO: 定義 props
  // defaultValue?: ...   ← 非受控模式的初始值
  // value?: ...          ← 受控模式的值
  // onValueChange?: ...  ← 狀態改變的回調
  // disabled?: boolean   ← 是否禁用
}

export const ${PascalName}Root = forwardRef<HTMLDivElement, ${PascalName}RootProps>(
  (props, ref) => {
    // TODO: 解構 props
    // const { children, defaultValue, value, onValueChange, disabled, ...htmlProps } = props

    // TODO: 用 useState 管理內部狀態（非受控）
    // const [internalValue, setInternalValue] = useState(defaultValue ?? ...)

    // TODO: 建立 Context value 物件

    // TODO: 渲染 Context Provider + <div>
    return null // ← 替換這行
  },
)

${PascalName}Root.displayName = '${PascalName}Root'
`
}

function genReactPart(comp, part) {
  const { name, PascalName, ariaPattern } = comp
  const isButton = part.element === 'button' || part.element === 'input'
  const htmlType = part.element === 'input' ? `input` : part.element
  const refType = {
    div: 'HTMLDivElement',
    button: 'HTMLButtonElement',
    span: 'HTMLSpanElement',
    label: 'HTMLLabelElement',
    p: 'HTMLParagraphElement',
    h2: 'HTMLHeadingElement',
    h3: 'HTMLHeadingElement',
    input: 'HTMLInputElement',
    img: 'HTMLImageElement',
  }[part.element] || 'HTMLElement'

  return `import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

// =============================================================================
// TODO: 實作 ${PascalName}${part.PascalName}
// =============================================================================
//
// 功能說明：${part.desc}
//
// 💡 提示：
// Step 1 — 從 Context 讀取需要的狀態
//   使用 use${PascalName}Context() 取得所需資料
//
// Step 2 — ARIA 無障礙屬性
//   參考 ${ariaPattern}
//   決定此元素需要哪些 aria-* 和 role 屬性
//
// Step 3 — 事件處理
//   實作互動行為，並保留使用者傳入的 event handler
//   例：const handleClick = (e) => { props.onClick?.(e); doSomething() }
//
// Step 4 — data-* 屬性
//   加上 data-state、data-disabled 等屬性供 CSS 使用
//
// 📖 參考：
// - ARIA Pattern: ${ariaPattern}
// - Ark UI ${PascalName}${part.PascalName} 實作參考：
//   https://github.com/chakra-ui/ark/blob/main/packages/react/src/components/${toKebabCase(PascalName)}/${name}-${part.name}.tsx
// =============================================================================

export interface ${PascalName}${part.PascalName}Props extends ComponentPropsWithoutRef<'${htmlType}'> {
  // TODO: 是否需要額外的 props？
}

export const ${PascalName}${part.PascalName} = forwardRef<${refType}, ${PascalName}${part.PascalName}Props>(
  (props, ref) => {
    // TODO: 從 Context 讀取狀態
    // const { ... } = use${PascalName}Context()

    // TODO: 實作邏輯

    // TODO: 渲染
    return null // ← 替換這行
  },
)

${PascalName}${part.PascalName}.displayName = '${PascalName}${part.PascalName}'
`
}

function genReactNamespace(comp) {
  const { name, PascalName, parts } = comp
  const exports = parts
    .map(p => `export { ${PascalName}${p.PascalName} as ${p.PascalName} } from './${name}-${p.name}'`)
    .join('\n')
  return `// Namespace 匯出（讓使用者可以用 <${PascalName}.Root> <${PascalName}.Trigger> 等語法）
${exports}
`
}

function genReactIndex(comp) {
  const { name, PascalName, parts } = comp
  const namedExports = parts
    .map(p => {
      return `export { ${PascalName}${p.PascalName}, type ${PascalName}${p.PascalName}Props } from './${name}-${p.name}'`
    })
    .join('\n')
  return `// 具名匯出
${namedExports}

// Namespace 匯出
export * as ${PascalName} from './${name}'
`
}

function genReactTest(comp) {
  const { name, PascalName, parts, ariaPattern, keyHints } = comp
  return `import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ${PascalName} } from './${name}'

// =============================================================================
// TODO: 實作 ${PascalName} 測試
// =============================================================================
//
// 建議測試案例：
//
// ✅ 渲染測試
//   - 確認元件能正確渲染不報錯
//   - 確認 DOM 結構包含預期的元素
//
// ✅ 互動測試
//   - 點擊/觸發後狀態應改變
//   - disabled 狀態下不應該觸發
//
// ✅ ARIA 無障礙測試
//   - 確認 ARIA 屬性正確（aria-expanded、aria-controls 等）
//   - 確認鍵盤導航可運作
//
// ✅ 受控 vs 非受控模式
//   - 非受控：state 由元件內部管理
//   - 受控：state 由外部 value prop 控制
//
// 💡 鍵提醒：
${keyHints.slice(0, 3).map(h => `//   - ${h}`).join('\n')}
//
// 📖 參考：
// - Testing Library: https://testing-library.com/docs/react-testing-library/intro/
// - ARIA Pattern: ${ariaPattern}
// =============================================================================

describe('${PascalName}', () => {
  it('TODO: renders without crashing', () => {
    // TODO: render 基本的 ${PascalName}
    // render(
    //   <${PascalName}.Root>
    //     ...
    //   </${PascalName}.Root>
    // )
    // expect(screen.getByRole('...')).toBeInTheDocument()
  })

  it('TODO: handles user interaction', async () => {
    // TODO: 測試點擊等互動
    // const user = userEvent.setup()
    // render(...)
    // await user.click(screen.getByRole('...'))
    // expect(...).toBeInTheDocument()
  })

  it('TODO: has correct ARIA attributes', () => {
    // TODO: 測試 ARIA 屬性
  })
})
`
}

// ============================================================
// Vue 模板生成
// ============================================================

function genVueContext(comp) {
  const { name, PascalName, contextFields } = comp
  return `import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

// =============================================================================
// TODO: 定義 ${PascalName} 的 Vue Provide/Inject Context
// =============================================================================
//
// 💡 提示：
// Vue 使用 provide/inject 代替 React 的 Context
//
// 1. 定義 Context 型別（${PascalName}ContextValue interface）
// 2. 建立 InjectionKey（型別安全的 inject key）
// 3. 建立 provide${PascalName}Context 函式（在 Root 呼叫）
// 4. 建立 use${PascalName}Context 函式（在子元件呼叫），加上錯誤處理
//
// Context 需要包含：
${contextFields.map(f => `//   - ${f.name}: ${f.type}  →  ${f.desc}`).join('\n')}
//
// 📖 參考：
// - Vue provide/inject: https://vuejs.org/guide/components/provide-inject
// - Ark UI Vue Context 範例：https://github.com/chakra-ui/ark/blob/main/packages/vue/src/utils/inject-context.ts
// =============================================================================

// TODO: 定義 ${PascalName}ContextValue interface
// export interface ${PascalName}ContextValue {
${contextFields.map(f => `//   ${f.name}: ${f.type}`).join('\n')}
// }

// TODO: 建立 InjectionKey
// const ${PascalName}ContextKey: InjectionKey<${PascalName}ContextValue> = Symbol('${PascalName}Context')

// TODO: 建立 provide 函式
// export function provide${PascalName}Context(value: ${PascalName}ContextValue) {
//   provide(${PascalName}ContextKey, value)
// }

// TODO: 建立 use 函式
// export function use${PascalName}Context(): ${PascalName}ContextValue {
//   const context = inject(${PascalName}ContextKey)
//   if (!context) {
//     throw new Error('use${PascalName}Context must be used within <${PascalName}.Root>')
//   }
//   return context
// }
`
}

function genVueRoot(comp) {
  const { name, PascalName, keyHints, ariaPattern, zagMachine } = comp
  return `<script setup lang="ts">
// =============================================================================
// TODO: 實作 ${PascalName}Root Vue 元件
// =============================================================================
//
// 💡 提示：
// Step 1 — 定義 Props（使用 withDefaults + defineProps）
//   - value?（受控）/ defaultValue?（非受控）
//   - onValueChange?: 狀態改變的回調
//   - disabled?: boolean
//
// Step 2 — 狀態管理（使用 ref 或 reactive）
//   const internalValue = ref(props.defaultValue ?? ...)
//   const currentValue = computed(() => props.value ?? internalValue.value)
//
// Step 3 — Provide Context（使用 provide${PascalName}Context）
//   在 setup 中 provide context 給子元件
//
// 架構重點：
${keyHints.slice(0, 2).map(h => `// - ${h}`).join('\n')}
//
// 📖 參考：
// - Vue Composition API: https://vuejs.org/guide/extras/composition-api-faq
// - provide/inject: https://vuejs.org/guide/components/provide-inject
// - ARIA Pattern: ${ariaPattern}
// - Zag.js 參考: ${zagMachine}
// =============================================================================

// TODO: import provide function
// import { provide${PascalName}Context } from './${name}-context'

// TODO: 定義 Props
// const props = withDefaults(defineProps<{
//   value?: ...
//   defaultValue?: ...
//   onValueChange?: (value: ...) => void
//   disabled?: boolean
// }>(), {})

// TODO: 狀態管理（ref + computed）

// TODO: Provide context
// provide${PascalName}Context({ ... })
</script>

<template>
  <!-- TODO: 渲染根容器 -->
  <!-- 提示：加上 data-state 屬性供 CSS 使用 -->
  <div v-bind="$attrs">
    <slot />
  </div>
</template>
`
}

function genVuePart(comp, part) {
  const { name, PascalName, ariaPattern } = comp
  return `<script setup lang="ts">
// =============================================================================
// TODO: 實作 ${PascalName}${part.PascalName} Vue 元件
// =============================================================================
//
// 功能說明：${part.desc}
//
// 💡 提示：
// Step 1 — 從 Context 取得狀態
//   import { use${PascalName}Context } from './${name}-context'
//   const context = use${PascalName}Context()
//
// Step 2 — 計算 ARIA 屬性（使用 computed）
//
// Step 3 — 事件處理（使用 defineEmits 或直接呼叫 context 方法）
//
// 📖 參考：
// - ARIA Pattern: ${ariaPattern}
// - Ark UI ${PascalName}${part.PascalName} Vue 版本：
//   https://github.com/chakra-ui/ark/blob/main/packages/vue/src/components/${toKebabCase(PascalName)}/${PascalName}${part.PascalName}.vue
// =============================================================================

// TODO: 從 Context 讀取狀態
// const context = use${PascalName}Context()
</script>

<template>
  <!-- TODO: 渲染 <${part.element}> 並加上 ARIA 屬性 -->
  <${part.element} v-bind="$attrs">
    <slot />
  </${part.element}>
</template>
`
}

function genVueNamespace(comp) {
  const { name, PascalName, parts } = comp
  const imports = parts.map(p => `import ${PascalName}${p.PascalName}Component from './${PascalName}${p.PascalName}.vue'`).join('\n')
  const exports = parts.map(p => `  ${p.PascalName}: ${PascalName}${p.PascalName}Component,`).join('\n')
  return `${imports}

// Namespace 物件（讓使用者可以用 <${PascalName}.Root> 等語法）
export const ${PascalName} = {
${exports}
}
`
}

function genVueIndex(comp) {
  const { name, PascalName, parts } = comp
  const imports = parts.map(p => `export { default as ${PascalName}${p.PascalName} } from './${PascalName}${p.PascalName}.vue'`).join('\n')
  return `// 具名匯出
${imports}

// Namespace 匯出
export { ${PascalName} } from './${name}'
`
}

// ============================================================
// Solid 模板生成（與 React 極為相似）
// ============================================================

function genSolidContext(comp) {
  const { name, PascalName, contextFields } = comp
  return `import { createContext, useContext } from 'solid-js'

// =============================================================================
// TODO: 定義 ${PascalName} 的 Solid Context
// =============================================================================
//
// 💡 提示（Solid 與 React 的差異）：
// - Solid 的 createContext 需要傳入預設值，不能是 null（或加型別斷言）
// - 通常的做法是不傳預設值，在 use hook 中檢查是否為 undefined
// - Solid 的狀態用 createSignal、createMemo 等 primitive
//
// Context 需要包含：
${contextFields.map(f => `//   - ${f.name}: ${f.type}  →  ${f.desc}`).join('\n')}
//
// 📖 參考：
// - Solid createContext: https://www.solidjs.com/docs/latest#createcontext
// - Solid Accessor pattern: https://www.solidjs.com/tutorial/stores_createstore
// =============================================================================

// TODO: 定義型別
// export interface ${PascalName}ContextValue {
${contextFields.map(f => `//   ${f.name}: ${f.type}`).join('\n')}
// }

// TODO: 建立 Context
// const ${PascalName}Context = createContext<${PascalName}ContextValue>()

// TODO: 建立 use hook
// export function use${PascalName}Context(): ${PascalName}ContextValue {
//   const context = useContext(${PascalName}Context)
//   if (!context) {
//     throw new Error('use${PascalName}Context must be used within <${PascalName}.Root>')
//   }
//   return context
// }
`
}

function genSolidRoot(comp) {
  const { name, PascalName, keyHints, ariaPattern, zagMachine } = comp
  return `import type { ParentProps } from 'solid-js'
import { createSignal } from 'solid-js'

// =============================================================================
// TODO: 實作 ${PascalName}Root（Solid 版）
// =============================================================================
//
// 💡 Solid 與 React 的主要差異：
// - 狀態管理：createSignal 代替 useState
//   const [value, setValue] = createSignal(defaultValue)
// - 沒有 forwardRef：Solid 5 使用 ref prop 直接傳遞
// - Context：用 <${PascalName}Context.Provider value={...}> 包住
//
// 架構重點：
${keyHints.slice(0, 2).map(h => `// - ${h}`).join('\n')}
//
// 📖 參考：
// - Solid Signals: https://www.solidjs.com/docs/latest#createsignal
// - Solid Context: https://www.solidjs.com/docs/latest#createcontext
// - ARIA Pattern: ${ariaPattern}
// - Zag.js 參考: ${zagMachine}
// =============================================================================

export interface ${PascalName}RootProps extends ParentProps {
  // TODO: 定義 props
}

export function ${PascalName}Root(props: ${PascalName}RootProps) {
  // TODO: createSignal 管理狀態

  // TODO: 建立 context value

  // TODO: 渲染 Provider + div
  return null // ← 替換這行
}
`
}

function genSolidPart(comp, part) {
  const { name, PascalName, ariaPattern } = comp
  return `import type { ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'

// =============================================================================
// TODO: 實作 ${PascalName}${part.PascalName}（Solid 版）
// =============================================================================
//
// 功能說明：${part.desc}
//
// 💡 Solid 技巧：
// - 使用 splitProps 分離元件專屬 props 和原生 HTML props
//   const [local, others] = splitProps(props, ['特定prop1', '特定prop2'])
// - Solid 的屬性是 getter，直接存取 props.xxx 即可（反應式）
// - 用 <Dynamic> 元件可以動態選擇標籤（可選）
//
// 📖 參考：
// - splitProps: https://www.solidjs.com/docs/latest#splitprops
// - ARIA Pattern: ${ariaPattern}
// - Ark UI ${PascalName}${part.PascalName} Solid 版本：
//   https://github.com/chakra-ui/ark/blob/main/packages/solid/src/components/${toKebabCase(PascalName)}/${name}-${part.name}.tsx
// =============================================================================

export interface ${PascalName}${part.PascalName}Props extends ComponentProps<'${part.element}'> {
  // TODO: 額外 props
}

export function ${PascalName}${part.PascalName}(props: ${PascalName}${part.PascalName}Props) {
  // TODO: 從 Context 讀取狀態
  // const context = use${PascalName}Context()

  // TODO: splitProps
  // const [local, others] = splitProps(props, [...])

  // TODO: 渲染
  return null // ← 替換這行
}
`
}

function genSolidNamespace(comp) {
  const { name, PascalName, parts } = comp
  const exports = parts.map(p => `export { ${PascalName}${p.PascalName} as ${p.PascalName} } from './${name}-${p.name}'`).join('\n')
  return `// Namespace 匯出
${exports}
`
}

function genSolidIndex(comp) {
  const { name, PascalName, parts } = comp
  const namedExports = parts.map(p => `export { ${PascalName}${p.PascalName}, type ${PascalName}${p.PascalName}Props } from './${name}-${p.name}'`).join('\n')
  return `// 具名匯出
${namedExports}

// Namespace 匯出
export * as ${PascalName} from './${name}'
`
}

// ============================================================
// Svelte 模板生成
// ============================================================

function genSvelteContext(comp) {
  const { name, PascalName, contextFields } = comp
  return `import { getContext, setContext } from 'svelte'

// =============================================================================
// TODO: 定義 ${PascalName} 的 Svelte Context
// =============================================================================
//
// 💡 提示（Svelte 的 Context 方式）：
// - Svelte 使用 setContext / getContext（類似 Vue 的 provide/inject）
// - key 通常是一個 Symbol 或字串（建議用 Symbol 避免衝突）
// - 配合 Svelte 5 的 runes（$state, $derived）可以讓 context 是反應式的
//
// Svelte 5 Runes 版本範例：
// class ${PascalName}State {
//   value = $state(...)
//   // ...
// }
//
// Context 需要包含：
${contextFields.map(f => `//   - ${f.name}: ${f.type}  →  ${f.desc}`).join('\n')}
//
// 📖 參考：
// - Svelte Context: https://svelte.dev/docs/svelte#setcontext
// - Svelte 5 Runes: https://svelte.dev/docs/svelte/$state
// - Ark UI Svelte Context：https://github.com/chakra-ui/ark/blob/main/packages/svelte/src/lib/utils/create-context.svelte.ts
// =============================================================================

const CONTEXT_KEY = Symbol('${PascalName}')

// TODO: 定義型別
// export interface ${PascalName}ContextValue {
${contextFields.map(f => `//   ${f.name}: ${f.type}`).join('\n')}
// }

// TODO: set context 函式
// export function set${PascalName}Context(value: ${PascalName}ContextValue) {
//   setContext(CONTEXT_KEY, value)
// }

// TODO: get context 函式
// export function get${PascalName}Context(): ${PascalName}ContextValue {
//   const context = getContext<${PascalName}ContextValue>(CONTEXT_KEY)
//   if (!context) {
//     throw new Error('get${PascalName}Context must be called within ${PascalName}Root')
//   }
//   return context
// }
`
}

function genSvelteRoot(comp) {
  const { name, PascalName, keyHints, ariaPattern, zagMachine } = comp
  return `<script lang="ts">
  // ===========================================================================
  // TODO: 實作 ${PascalName}Root（Svelte 5 版）
  // ===========================================================================
  //
  // 💡 提示（Svelte 5 Runes）：
  // - 使用 $props() 取得 props（代替 export let）
  // - 使用 $state() 建立反應式狀態
  // - 使用 setContext / set${PascalName}Context 把狀態分享給子元件
  //
  // 架構重點：
${keyHints.slice(0, 2).map(h => `  // - ${h}`).join('\n')}
  //
  // 📖 參考：
  // - Svelte 5 $props: https://svelte.dev/docs/svelte/$props
  // - Svelte 5 $state: https://svelte.dev/docs/svelte/$state
  // - ARIA Pattern: ${ariaPattern}
  // - Zag.js 參考: ${zagMachine}
  // ===========================================================================

  // TODO: 定義 Props（Svelte 5 方式）
  // interface Props {
  //   value?: ...
  //   defaultValue?: ...
  //   onValueChange?: (value: ...) => void
  //   children?: import('svelte').Snippet
  // }
  // const { ...props }: Props = $props()

  // TODO: 狀態管理（$state）
  // let internalValue = $state(props.defaultValue ?? ...)

  // TODO: setContext
  // set${PascalName}Context({ ... })
</script>

<!-- TODO: 渲染根容器 -->
<!-- 提示：加上 data-state 屬性供 CSS 使用 -->
<div>
  {@render children?.()}
</div>
`
}

function genSveltePart(comp, part) {
  const { name, PascalName, ariaPattern } = comp
  return `<script lang="ts">
  // ===========================================================================
  // TODO: 實作 ${PascalName}${part.PascalName}（Svelte 5 版）
  // ===========================================================================
  //
  // 功能說明：${part.desc}
  //
  // 💡 提示：
  // Step 1 — 從 Context 讀取狀態
  //   import { get${PascalName}Context } from './${name}-context.svelte.ts'
  //   const context = get${PascalName}Context()
  //
  // Step 2 — 計算 ARIA 屬性（使用 $derived）
  //   const isExpanded = $derived(context.value === props.value)
  //
  // Step 3 — 事件處理（Svelte 5 用 onclick 代替 on:click）
  //
  // 📖 參考：
  // - Svelte 5 $derived: https://svelte.dev/docs/svelte/$derived
  // - ARIA Pattern: ${ariaPattern}
  // - Ark UI ${PascalName}${part.PascalName} Svelte 版本：
  //   https://github.com/chakra-ui/ark/blob/main/packages/svelte/src/lib/components/${toKebabCase(PascalName)}/${PascalName}${part.PascalName}.svelte
  // ===========================================================================

  // TODO: import context
  // const context = get${PascalName}Context()

  // TODO: $derived 計算屬性
</script>

<!-- TODO: 渲染 <${part.element}> 並加上 ARIA 屬性 -->
<${part.element}>
  {@render children?.()}
</${part.element}>
`
}

function genSvelteNamespace(comp) {
  const { name, PascalName, parts } = comp
  const imports = parts.map(p => `import ${PascalName}${p.PascalName}Component from './${PascalName}${p.PascalName}.svelte'`).join('\n')
  const exports = parts.map(p => `  ${p.PascalName}: ${PascalName}${p.PascalName}Component,`).join('\n')
  return `${imports}

export const ${PascalName} = {
${exports}
}
`
}

function genSvelteIndex(comp) {
  const { name, PascalName, parts } = comp
  const imports = parts.map(p => `export { default as ${PascalName}${p.PascalName} } from './${PascalName}${p.PascalName}.svelte'`).join('\n')
  return `// 具名匯出
${imports}

// Namespace 匯出
export { ${PascalName} } from './${name}'
`
}

// ============================================================
// Core 型別模板
// ============================================================

function genCoreTypes(comp) {
  const { name, PascalName, description, contextFields, parts, ariaPattern, zagMachine } = comp
  return `// =============================================================================
// ${PascalName} Core Types
// =============================================================================
//
// 這個檔案定義了 ${PascalName} 元件的框架無關型別介面
// 每個 Framework Adapter（React/Vue/Solid/Svelte）應實作這些介面
//
// 元件說明：${description}
//
// 📖 參考：
// - ARIA Pattern: ${ariaPattern}
// - Zag.js Machine: ${zagMachine}
// =============================================================================

/**
 * ${PascalName} 元件的 Anatomy（組成部分）
 * 列舉此元件包含的所有 parts
 */
export type ${PascalName}Part = ${parts.map(p => `'${p.name}'`).join(' | ')}

/**
 * ${PascalName} 的 Context 狀態介面
 * Framework Adapter 的 Context 應包含這些欄位
 */
export interface ${PascalName}ContextValue {
${contextFields.map(f => `  /** ${f.desc} */\n  ${f.name}: ${f.type}`).join('\n')}
}

/**
 * ${PascalName}Root 的 Props 介面
 */
export interface ${PascalName}RootBaseProps {
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
 * ${PascalName} 的 Anatomy 定義
 * 每個 part 對應的 HTML 元素
 */
export const ${PascalName.toUpperCase()}_ANATOMY = {
${parts.map(p => `  /** ${p.desc} */\n  ${p.name.replace(/-/g, '_').toUpperCase()}: '${p.element}' as const,`).join('\n')}
} as const
`
}

// ============================================================
// anatomy.ts 和 factory.ts
// ============================================================

function genAnatomyTs(allComponents) {
  const entries = allComponents.map(comp => {
    const { name, PascalName, parts, description } = comp
    const partList = parts.map(p => `'${p.name}'`).join(', ')
    return `// ${description}
export const ${toKebabCase(PascalName).replace(/-/g, '_').toUpperCase()}_ANATOMY = [${partList}] as const
export type ${PascalName}Anatomy = typeof ${toKebabCase(PascalName).replace(/-/g, '_').toUpperCase()}_ANATOMY[number]`
  })

  return `// =============================================================================
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

${entries.join('\n\n')}
`
}

function genReactFactoryTs() {
  return `import { createElement, forwardRef } from 'react'
import type { ElementType, ComponentPropsWithoutRef } from 'react'

// =============================================================================
// TODO: 實作 React 元素工廠（factory）
// =============================================================================
//
// 工廠函式的用途：
//   建立可接受 data-part、as（polymorphic）等特殊 props 的基礎元素
//
// 使用範例（完成後）：
//   <ark.div data-part="root" data-state={open ? 'open' : 'closed'} />
//   <ark.button data-part="trigger" />
//
// 💡 提示：
//
// Step 1 — 定義 ArkProps 介面
//   加入 as prop（polymorphic component 的核心）
//   加入 asChild prop（Radix UI 的 Slot 模式）
//
// Step 2 — 建立 createArkComponent 函式
//   接受一個 HTML 標籤名稱，回傳一個 forwardRef 元件
//
// Step 3 — 建立 ark 物件
//   包含常用的 HTML 元素（div, button, span, input, label, p, h2, h3...）
//
// 進階概念 — Polymorphic Component：
//   <ark.div as="section" /> → 渲染為 <section>（不是 <div>）
//
// 進階概念 — Slot 模式（asChild）：
//   <ark.button asChild><a href="...">Link</a></ark.button>
//   → 把 props 合併到子元素上，不新增額外 DOM 節點
//
// 📖 參考：
// - Radix UI Slot: https://www.radix-ui.com/primitives/docs/utilities/slot
// - Ark UI factory: https://github.com/chakra-ui/ark/blob/main/packages/react/src/utils/factory.tsx
// - Polymorphic Components: https://www.freecodecamp.org/news/build-strongly-typed-polymorphic-components-with-react-and-typescript/
// =============================================================================

// TODO: 定義 ArkProps
// type ArkProps<T extends ElementType> = {
//   as?: T
//   asChild?: boolean
// } & ComponentPropsWithoutRef<T>

// TODO: 建立工廠函式
// function createArkComponent<T extends ElementType>(element: T) {
//   const ArkComponent = forwardRef<unknown, ArkProps<T>>((props, ref) => {
//     const { as: As = element, asChild, ...rest } = props
//     // TODO: 實作 asChild 模式
//     return createElement(As, { ref, ...rest })
//   })
//   ArkComponent.displayName = \`ark.\${String(element)}\`
//   return ArkComponent
// }

// TODO: 建立 ark 物件
// export const ark = {
//   div: createArkComponent('div'),
//   button: createArkComponent('button'),
//   span: createArkComponent('span'),
//   input: createArkComponent('input'),
//   label: createArkComponent('label'),
//   p: createArkComponent('p'),
//   h2: createArkComponent('h2'),
//   h3: createArkComponent('h3'),
//   img: createArkComponent('img'),
// }
`
}

function genVueFactoryTs() {
  return `import { h, defineComponent } from 'vue'
import type { DefineComponent } from 'vue'

// =============================================================================
// TODO: 實作 Vue 元素工廠（factory）
// =============================================================================
//
// 工廠函式的用途：
//   建立可接受 data-part 等特殊 props 的基礎元素
//
// 使用範例（完成後）：
//   <ark.div data-part="root" :data-state="open ? 'open' : 'closed'" />
//
// 💡 提示：
// - Vue 使用 defineComponent + h（渲染函式）來建立動態元件
// - 可以接受 as prop 來支援 polymorphic 渲染
//
// 📖 參考：
// - Vue h(): https://vuejs.org/api/render-function#h
// - Vue defineComponent: https://vuejs.org/api/general#definecomponent
// - Ark UI Vue factory: https://github.com/chakra-ui/ark/blob/main/packages/vue/src/utils/factory.ts
// =============================================================================

// TODO: 建立 Vue factory
// export const ark = {
//   div: createArkComponent('div'),
//   button: createArkComponent('button'),
//   // ...
// }
`
}

function genSolidFactoryTs() {
  return `import { Dynamic } from 'solid-js/web'
import type { ComponentProps, ValidComponent } from 'solid-js'

// =============================================================================
// TODO: 實作 Solid 元素工廠（factory）
// =============================================================================
//
// Solid 的 <Dynamic> 元件已經提供了動態標籤渲染的功能：
//   <Dynamic component={props.as ?? 'div'} {...rest} />
//
// 所以 Solid 的 factory 可以相對簡單
//
// 📖 參考：
// - Solid Dynamic: https://www.solidjs.com/docs/latest#dynamic
// - Ark UI Solid factory: https://github.com/chakra-ui/ark/blob/main/packages/solid/src/utils/factory.tsx
// =============================================================================

// TODO: 建立 Solid factory
// export const ark = {
//   div: createArkComponent('div'),
//   button: createArkComponent('button'),
//   // ...
// }
`
}

function genSvelteFactoryTs() {
  return `// =============================================================================
// TODO: 實作 Svelte 元素工廠（factory）
// =============================================================================
//
// Svelte 通常不需要像 React 那樣複雜的 factory
// 可以使用 <svelte:element this={tag}> 做動態標籤
//
// 或者使用一個共用的 Primitive 元件來包裝：
//   <Primitive tag="div" {...props} />
//
// 📖 參考：
// - Svelte element directive: https://svelte.dev/docs/svelte/svelte-element
// - Ark UI Svelte factory: https://github.com/chakra-ui/ark/tree/main/packages/svelte/src/lib/utils
// =============================================================================

// TODO: 根據需求實作 Svelte factory 或 Primitive 元件
`
}

// ============================================================
// 主要生成邏輯
// ============================================================

console.log('🚀 開始生成元件骨架...\n')

// 1. 生成 packages/core
console.log('📦 生成 packages/core...')

// core/package.json
writeFile(
  path.join(ROOT, 'packages/core/package.json'),
  JSON.stringify(
    {
      name: '@chromosphere/core',
      type: 'module',
      version: '0.0.1',
      description: 'Chromosphere Core Types - Framework-agnostic type definitions',
      license: 'MIT',
      exports: {
        '.': './src/index.ts',
        './*': './src/components/*/types.ts',
      },
    },
    null,
    2,
  ) + '\n',
)

// core/tsconfig.json
writeFile(
  path.join(ROOT, 'packages/core/tsconfig.json'),
  JSON.stringify(
    {
      extends: '../../tsconfig.json',
      compilerOptions: { outDir: 'dist' },
      include: ['src'],
      exclude: ['node_modules', 'dist'],
    },
    null,
    2,
  ) + '\n',
)

// core/src/index.ts
const coreIndexExports = components.map(c => `export * from './components/${c.name}/types'`).join('\n')
writeFile(
  path.join(ROOT, 'packages/core/src/index.ts'),
  `// @chromosphere/core — 框架無關的型別定義
// 每個 Framework Adapter 應實作這些介面

${coreIndexExports}
`,
)

// core types for each component
for (const comp of components) {
  writeFile(
    path.join(ROOT, `packages/core/src/components/${comp.name}/types.ts`),
    genCoreTypes(comp),
  )
}

console.log('')

// 2. 生成 React 元件
console.log('⚛️  生成 React 元件...')

// anatomy.ts
writeFile(
  path.join(ROOT, 'packages/react/src/components/anatomy.ts'),
  genAnatomyTs(components),
)

// factory.ts
writeFile(
  path.join(ROOT, 'packages/react/src/components/factory.ts'),
  genReactFactoryTs(),
)

// 更新 components/index.ts
const reactComponentsIndexContent = `// React 元件統一匯出
// TODO: 逐步取消以下注釋，當你完成各元件的實作後
export * from './collapsible'
${components.map(c => `// export * from './${c.name}'`).join('\n')}
`
writeFile(
  path.join(ROOT, 'packages/react/src/components/index.ts'),
  reactComponentsIndexContent,
)

for (const comp of components) {
  const dir = path.join(ROOT, `packages/react/src/components/${comp.name}`)

  // context.ts
  writeFile(path.join(dir, `${comp.name}-context.ts`), genReactContext(comp))

  // root.tsx
  writeFile(path.join(dir, `${comp.name}-root.tsx`), genReactRoot(comp))

  // parts
  for (const part of comp.parts) {
    if (part.name === 'root') continue // root 已另外生成
    writeFile(path.join(dir, `${comp.name}-${part.name}.tsx`), genReactPart(comp, part))
  }

  // namespace
  writeFile(path.join(dir, `${comp.name}.ts`), genReactNamespace(comp))

  // test
  writeFile(path.join(dir, `${comp.name}.test.tsx`), genReactTest(comp))

  // index.ts
  writeFile(path.join(dir, 'index.ts'), genReactIndex(comp))
}

// 更新 react/src/index.ts
writeFile(
  path.join(ROOT, 'packages/react/src/index.ts'),
  `// @chromosphere/react
// TODO: 逐步取消以下注釋，當你完成各元件的實作後
export * from './components/collapsible'
${components.map(c => `// export * from './components/${c.name}'`).join('\n')}
`,
)

console.log('')

// 3. 生成 Vue 元件
console.log('💚 生成 Vue 元件...')

writeFile(
  path.join(ROOT, 'packages/vue/src/components/anatomy.ts'),
  genAnatomyTs(components),
)

writeFile(
  path.join(ROOT, 'packages/vue/src/components/factory.ts'),
  genVueFactoryTs(),
)

// Collapsible for Vue
const collapsibleComp = {
  name: 'collapsible',
  PascalName: 'Collapsible',
  description: '可收合區塊',
  complexity: 'easy',
  ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/',
  zagMachine: 'https://zagjs.com/components/react/collapsible',
  parts: [
    { name: 'root', PascalName: 'Root', element: 'div', desc: '根容器，管理 open 狀態' },
    { name: 'trigger', PascalName: 'Trigger', element: 'button', desc: '觸發展開/收合的按鈕' },
    { name: 'content', PascalName: 'Content', element: 'div', desc: '可收合的內容區域' },
  ],
  contextFields: [
    { name: 'open', type: 'boolean', desc: '是否展開' },
    { name: 'toggle', type: '() => void', desc: '切換展開/收合' },
    { name: 'contentId', type: 'string', desc: '內容區域的唯一 id' },
    { name: 'disabled', type: 'boolean', desc: '是否禁用' },
  ],
  keyHints: [
    'Trigger 需要 aria-expanded 和 aria-controls',
    'Content 需要 id 對應 Trigger 的 aria-controls',
    'data-state="open" | "closed" 供 CSS 使用',
  ],
}

const allComponentsWithCollapsible = [collapsibleComp, ...components]

for (const comp of allComponentsWithCollapsible) {
  const dir = path.join(ROOT, `packages/vue/src/components/${comp.name}`)

  writeFile(path.join(dir, `${comp.name}-context.ts`), genVueContext(comp))
  writeFile(path.join(dir, `${comp.PascalName}Root.vue`), genVueRoot(comp))

  for (const part of comp.parts) {
    if (part.name === 'root') continue
    writeFile(path.join(dir, `${comp.PascalName}${part.PascalName}.vue`), genVuePart(comp, part))
  }

  writeFile(path.join(dir, `${comp.name}.ts`), genVueNamespace(comp))
  writeFile(path.join(dir, 'index.ts'), genVueIndex(comp))
}

writeFile(
  path.join(ROOT, 'packages/vue/src/components/index.ts'),
  `// Vue 元件統一匯出\n${allComponentsWithCollapsible.map(c => `// export * from './${c.name}'`).join('\n')}\n`,
)

writeFile(
  path.join(ROOT, 'packages/vue/src/index.ts'),
  `// @chromosphere/vue\n${allComponentsWithCollapsible.map(c => `// export * from './components/${c.name}'`).join('\n')}\n`,
)

console.log('')

// 4. 生成 Solid 元件
console.log('🟡 生成 Solid 元件...')

writeFile(
  path.join(ROOT, 'packages/solid/src/components/anatomy.ts'),
  genAnatomyTs(components),
)

writeFile(
  path.join(ROOT, 'packages/solid/src/components/factory.ts'),
  genSolidFactoryTs(),
)

for (const comp of allComponentsWithCollapsible) {
  const dir = path.join(ROOT, `packages/solid/src/components/${comp.name}`)

  writeFile(path.join(dir, `${comp.name}-context.ts`), genSolidContext(comp))
  writeFile(path.join(dir, `${comp.name}-root.tsx`), genSolidRoot(comp))

  for (const part of comp.parts) {
    if (part.name === 'root') continue
    writeFile(path.join(dir, `${comp.name}-${part.name}.tsx`), genSolidPart(comp, part))
  }

  writeFile(path.join(dir, `${comp.name}.ts`), genSolidNamespace(comp))
  writeFile(path.join(dir, `${comp.name}.test.tsx`), genReactTest(comp)) // 測試結構相近
  writeFile(path.join(dir, 'index.ts'), genSolidIndex(comp))
}

writeFile(
  path.join(ROOT, 'packages/solid/src/components/index.ts'),
  `// Solid 元件統一匯出\n${allComponentsWithCollapsible.map(c => `// export * from './${c.name}'`).join('\n')}\n`,
)

writeFile(
  path.join(ROOT, 'packages/solid/src/index.ts'),
  `// @chromosphere/solid\n${allComponentsWithCollapsible.map(c => `// export * from './components/${c.name}'`).join('\n')}\n`,
)

console.log('')

// 5. 生成 Svelte 元件
console.log('🔴 生成 Svelte 元件...')

writeFile(
  path.join(ROOT, 'packages/svelte/src/components/anatomy.ts'),
  genAnatomyTs(components),
)

writeFile(
  path.join(ROOT, 'packages/svelte/src/components/factory.ts'),
  genSvelteFactoryTs(),
)

for (const comp of allComponentsWithCollapsible) {
  const dir = path.join(ROOT, `packages/svelte/src/components/${comp.name}`)

  writeFile(path.join(dir, `${comp.name}-context.ts`), genSvelteContext(comp))
  writeFile(path.join(dir, `${comp.PascalName}Root.svelte`), genSvelteRoot(comp))

  for (const part of comp.parts) {
    if (part.name === 'root') continue
    writeFile(
      path.join(dir, `${comp.PascalName}${part.PascalName}.svelte`),
      genSveltePart(comp, part),
    )
  }

  writeFile(path.join(dir, `${comp.name}.ts`), genSvelteNamespace(comp))
  writeFile(path.join(dir, 'index.ts'), genSvelteIndex(comp))
}

writeFile(
  path.join(ROOT, 'packages/svelte/src/components/index.ts'),
  `// Svelte 元件統一匯出\n${allComponentsWithCollapsible.map(c => `// export * from './${c.name}'`).join('\n')}\n`,
)

writeFile(
  path.join(ROOT, 'packages/svelte/src/index.ts'),
  `// @chromosphere/svelte\n${allComponentsWithCollapsible.map(c => `// export * from './components/${c.name}'`).join('\n')}\n`,
)

console.log('\n✨ 生成完成！')
console.log('\n📁 架構摘要：')
console.log(`  - packages/core: ${components.length} 個元件的型別定義`)
console.log(`  - packages/react: ${components.length} 個新元件骨架 + anatomy.ts + factory.ts`)
console.log(`  - packages/vue: ${allComponentsWithCollapsible.length} 個元件骨架 + anatomy.ts + factory.ts`)
console.log(`  - packages/solid: ${allComponentsWithCollapsible.length} 個元件骨架 + anatomy.ts + factory.ts`)
console.log(`  - packages/svelte: ${allComponentsWithCollapsible.length} 個元件骨架 + anatomy.ts + factory.ts`)
