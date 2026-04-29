import type { ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'

// =============================================================================
// TODO: 實作 ProgressTrack（Solid 版）
// =============================================================================
//
// 功能說明：進度條背景軌道
//
// 💡 Solid 技巧：
// - 使用 splitProps 分離元件專屬 props 和原生 HTML props
//   const [local, others] = splitProps(props, ['特定prop1', '特定prop2'])
// - Solid 的屬性是 getter，直接存取 props.xxx 即可（反應式）
// - 用 <Dynamic> 元件可以動態選擇標籤（可選）
//
// 📖 參考：
// - splitProps: https://www.solidjs.com/docs/latest#splitprops
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/meter/
// - Ark UI ProgressTrack Solid 版本：
//   https://github.com/chakra-ui/ark/blob/main/packages/solid/src/components/progress/progress-track.tsx
// =============================================================================

export interface ProgressTrackProps extends ComponentProps<'div'> {
  // TODO: 額外 props
}

export function ProgressTrack(props: ProgressTrackProps) {
  // TODO: 從 Context 讀取狀態
  // const context = useProgressContext()

  // TODO: splitProps
  // const [local, others] = splitProps(props, [...])

  // TODO: 渲染
  return null // ← 替換這行
}
