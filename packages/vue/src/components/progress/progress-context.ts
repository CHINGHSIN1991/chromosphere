import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

// =============================================================================
// TODO: 定義 Progress 的 Vue Provide/Inject Context
// =============================================================================
//
// 💡 提示：
// Vue 使用 provide/inject 代替 React 的 Context
//
// 1. 定義 Context 型別（ProgressContextValue interface）
// 2. 建立 InjectionKey（型別安全的 inject key）
// 3. 建立 provideProgressContext 函式（在 Root 呼叫）
// 4. 建立 useProgressContext 函式（在子元件呼叫），加上錯誤處理
//
// Context 需要包含：
//   - value: number | null  →  目前進度值（null 表示 indeterminate）
//   - min: number  →  最小值（預設 0）
//   - max: number  →  最大值（預設 100）
//
// 📖 參考：
// - Vue provide/inject: https://vuejs.org/guide/components/provide-inject
// - Ark UI Vue Context 範例：https://github.com/chakra-ui/ark/blob/main/packages/vue/src/utils/inject-context.ts
// =============================================================================

// TODO: 定義 ProgressContextValue interface
// export interface ProgressContextValue {
//   value: number | null
//   min: number
//   max: number
// }

// TODO: 建立 InjectionKey
// const ProgressContextKey: InjectionKey<ProgressContextValue> = Symbol('ProgressContext')

// TODO: 建立 provide 函式
// export function provideProgressContext(value: ProgressContextValue) {
//   provide(ProgressContextKey, value)
// }

// TODO: 建立 use 函式
// export function useProgressContext(): ProgressContextValue {
//   const context = inject(ProgressContextKey)
//   if (!context) {
//     throw new Error('useProgressContext must be used within <Progress.Root>')
//   }
//   return context
// }
