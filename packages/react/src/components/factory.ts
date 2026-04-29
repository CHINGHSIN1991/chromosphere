import { createElement, forwardRef } from 'react'
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
//   ArkComponent.displayName = `ark.${String(element)}`
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
