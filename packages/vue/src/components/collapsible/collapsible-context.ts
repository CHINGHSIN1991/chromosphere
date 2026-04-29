import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

// =============================================================================
// TODO: 定義 Collapsible 的 Vue Provide/Inject Context
// =============================================================================
//
// 💡 提示：
// Vue 使用 provide/inject 代替 React 的 Context
//
// 1. 定義 Context 型別（CollapsibleContextValue interface）
// 2. 建立 InjectionKey（型別安全的 inject key）
// 3. 建立 provideCollapsibleContext 函式（在 Root 呼叫）
// 4. 建立 useCollapsibleContext 函式（在子元件呼叫），加上錯誤處理
//
// Context 需要包含：
//   - open: boolean  →  是否展開
//   - toggle: () => void  →  切換展開/收合
//   - contentId: string  →  內容區域的唯一 id
//   - disabled: boolean  →  是否禁用
//
// 📖 參考：
// - Vue provide/inject: https://vuejs.org/guide/components/provide-inject
// - Ark UI Vue Context 範例：https://github.com/chakra-ui/ark/blob/main/packages/vue/src/utils/inject-context.ts
// =============================================================================

// TODO: 定義 CollapsibleContextValue interface
// export interface CollapsibleContextValue {
//   open: boolean
//   toggle: () => void
//   contentId: string
//   disabled: boolean
// }

// TODO: 建立 InjectionKey
// const CollapsibleContextKey: InjectionKey<CollapsibleContextValue> = Symbol('CollapsibleContext')

// TODO: 建立 provide 函式
// export function provideCollapsibleContext(value: CollapsibleContextValue) {
//   provide(CollapsibleContextKey, value)
// }

// TODO: 建立 use 函式
// export function useCollapsibleContext(): CollapsibleContextValue {
//   const context = inject(CollapsibleContextKey)
//   if (!context) {
//     throw new Error('useCollapsibleContext must be used within <Collapsible.Root>')
//   }
//   return context
// }
