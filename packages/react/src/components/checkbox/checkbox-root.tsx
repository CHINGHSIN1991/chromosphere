import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

// =============================================================================
// TODO: 實作 CheckboxRoot
// =============================================================================
//
// 這是 Checkbox 的根容器，職責：
//   1. 接受 props（受控 value + 非受控 defaultValue）
//   2. 用 useState 管理內部狀態
//   3. 透過 Context Provider 把狀態傳遞給子元件
//   4. 渲染 <div> 並加上適當的 data-state 屬性
//
// 💡 架構重點：
//   - Control + Indicator 是視覺層，HiddenInput 是語義/表單層（兩者都需要）
//   - 支援 indeterminate（不確定）狀態：data-state="indeterminate"
//   - Root 使用 label 元素，點擊 label 自動 toggle HiddenInput
//
// 📖 參考：
// - forwardRef: https://react.dev/reference/react/forwardRef
// - 受控 vs 非受控: https://react.dev/learn/sharing-state-between-components
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
// - Zag.js 狀態機參考: https://zagjs.com/components/react/checkbox
// =============================================================================

export interface CheckboxRootProps extends ComponentPropsWithoutRef<'div'> {
  // TODO: 定義 props
  // defaultValue?: ...   ← 非受控模式的初始值
  // value?: ...          ← 受控模式的值
  // onValueChange?: ...  ← 狀態改變的回調
  // disabled?: boolean   ← 是否禁用
}

export const CheckboxRoot = forwardRef<HTMLDivElement, CheckboxRootProps>(
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

CheckboxRoot.displayName = 'CheckboxRoot'
