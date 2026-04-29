import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

// =============================================================================
// TODO: 定義 Accordion 的 Vue Provide/Inject Context
// =============================================================================
//
// 💡 提示：
// Vue 使用 provide/inject 代替 React 的 Context
//
// 1. 定義 Context 型別（AccordionContextValue interface）
// 2. 建立 InjectionKey（型別安全的 inject key）
// 3. 建立 provideAccordionContext 函式（在 Root 呼叫）
// 4. 建立 useAccordionContext 函式（在子元件呼叫），加上錯誤處理
//
// Context 需要包含：
//   - value: string[]  →  目前展開的 item 值陣列
//   - setValue: (value: string[]) => void  →  更新展開狀態
//   - multiple: boolean  →  是否允許同時展開多個 item
//
// 📖 參考：
// - Vue provide/inject: https://vuejs.org/guide/components/provide-inject
// - Ark UI Vue Context 範例：https://github.com/chakra-ui/ark/blob/main/packages/vue/src/utils/inject-context.ts
// =============================================================================

// TODO: 定義 AccordionContextValue interface
// export interface AccordionContextValue {
//   value: string[]
//   setValue: (value: string[]) => void
//   multiple: boolean
// }

// TODO: 建立 InjectionKey
// const AccordionContextKey: InjectionKey<AccordionContextValue> = Symbol('AccordionContext')

// TODO: 建立 provide 函式
// export function provideAccordionContext(value: AccordionContextValue) {
//   provide(AccordionContextKey, value)
// }

// TODO: 建立 use 函式
// export function useAccordionContext(): AccordionContextValue {
//   const context = inject(AccordionContextKey)
//   if (!context) {
//     throw new Error('useAccordionContext must be used within <Accordion.Root>')
//   }
//   return context
// }
