import { Dynamic } from 'solid-js/web'
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
