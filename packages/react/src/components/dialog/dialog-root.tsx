import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

// =============================================================================
// TODO: 實作 DialogRoot
// =============================================================================
//
// 這是 Dialog 的根容器，職責：
//   1. 接受 props（受控 value + 非受控 defaultValue）
//   2. 用 useState 管理內部狀態
//   3. 透過 Context Provider 把狀態傳遞給子元件
//   4. 渲染 <div> 並加上適當的 data-state 屬性
//
// 💡 架構重點：
//   - Content 需要 role="dialog"、aria-modal="true"
//   - Content 的 aria-labelledby 指向 Title 的 id，aria-describedby 指向 Description 的 id
//   - Focus trap：Dialog 開啟時焦點應限制在 Content 內（重要的無障礙需求）
//
// 📖 參考：
// - forwardRef: https://react.dev/reference/react/forwardRef
// - 受控 vs 非受控: https://react.dev/learn/sharing-state-between-components
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
// - Zag.js 狀態機參考: https://zagjs.com/components/react/dialog
// =============================================================================

export interface DialogRootProps extends ComponentPropsWithoutRef<'div'> {
  // TODO: 定義 props
  // defaultValue?: ...   ← 非受控模式的初始值
  // value?: ...          ← 受控模式的值
  // onValueChange?: ...  ← 狀態改變的回調
  // disabled?: boolean   ← 是否禁用
}

export const DialogRoot = forwardRef<HTMLDivElement, DialogRootProps>(
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

DialogRoot.displayName = 'DialogRoot'
