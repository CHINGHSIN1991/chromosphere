import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

// =============================================================================
// TODO: 定義 Tabs 的 Vue Provide/Inject Context
// =============================================================================
//
// 💡 提示：
// Vue 使用 provide/inject 代替 React 的 Context
//
// 1. 定義 Context 型別（TabsContextValue interface）
// 2. 建立 InjectionKey（型別安全的 inject key）
// 3. 建立 provideTabsContext 函式（在 Root 呼叫）
// 4. 建立 useTabsContext 函式（在子元件呼叫），加上錯誤處理
//
// Context 需要包含：
//   - value: string  →  目前 active 的 tab value
//   - setValue: (value: string) => void  →  切換 tab
//
// 📖 參考：
// - Vue provide/inject: https://vuejs.org/guide/components/provide-inject
// - Ark UI Vue Context 範例：https://github.com/chakra-ui/ark/blob/main/packages/vue/src/utils/inject-context.ts
// =============================================================================

// TODO: 定義 TabsContextValue interface
// export interface TabsContextValue {
//   value: string
//   setValue: (value: string) => void
// }

// TODO: 建立 InjectionKey
// const TabsContextKey: InjectionKey<TabsContextValue> = Symbol('TabsContext')

// TODO: 建立 provide 函式
// export function provideTabsContext(value: TabsContextValue) {
//   provide(TabsContextKey, value)
// }

// TODO: 建立 use 函式
// export function useTabsContext(): TabsContextValue {
//   const context = inject(TabsContextKey)
//   if (!context) {
//     throw new Error('useTabsContext must be used within <Tabs.Root>')
//   }
//   return context
// }
