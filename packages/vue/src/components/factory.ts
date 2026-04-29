import { h, defineComponent } from 'vue'
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
