import type { ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'

// =============================================================================
// TODO: 實作 RadioGroupLabel（Solid 版）
// =============================================================================
//
// 功能說明：整組的標籤
//
// 💡 Solid 技巧：
// - 使用 splitProps 分離元件專屬 props 和原生 HTML props
//   const [local, others] = splitProps(props, ['特定prop1', '特定prop2'])
// - Solid 的屬性是 getter，直接存取 props.xxx 即可（反應式）
// - 用 <Dynamic> 元件可以動態選擇標籤（可選）
//
// 📖 參考：
// - splitProps: https://www.solidjs.com/docs/latest#splitprops
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/radio/
// - Ark UI RadioGroupLabel Solid 版本：
//   https://github.com/chakra-ui/ark/blob/main/packages/solid/src/components/radio-group/radio-group-label.tsx
// =============================================================================

export interface RadioGroupLabelProps extends ComponentProps<'label'> {
  // TODO: 額外 props
}

export function RadioGroupLabel(props: RadioGroupLabelProps) {
  // TODO: 從 Context 讀取狀態
  // const context = useRadioGroupContext()

  // TODO: splitProps
  // const [local, others] = splitProps(props, [...])

  // TODO: 渲染
  return null // ← 替換這行
}
