import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

// =============================================================================
// TODO: 定義 RadioGroup 的 Vue Provide/Inject Context
// =============================================================================
//
// 💡 提示：
// Vue 使用 provide/inject 代替 React 的 Context
//
// 1. 定義 Context 型別（RadioGroupContextValue interface）
// 2. 建立 InjectionKey（型別安全的 inject key）
// 3. 建立 provideRadioGroupContext 函式（在 Root 呼叫）
// 4. 建立 useRadioGroupContext 函式（在子元件呼叫），加上錯誤處理
//
// Context 需要包含：
//   - value: string  →  目前選中的值
//   - setValue: (value: string) => void  →  更新選中值
//   - name: string  →  表單欄位名稱（供 input[name] 使用）
//
// 📖 參考：
// - Vue provide/inject: https://vuejs.org/guide/components/provide-inject
// - Ark UI Vue Context 範例：https://github.com/chakra-ui/ark/blob/main/packages/vue/src/utils/inject-context.ts
// =============================================================================

// TODO: 定義 RadioGroupContextValue interface
// export interface RadioGroupContextValue {
//   value: string
//   setValue: (value: string) => void
//   name: string
// }

// TODO: 建立 InjectionKey
// const RadioGroupContextKey: InjectionKey<RadioGroupContextValue> = Symbol('RadioGroupContext')

// TODO: 建立 provide 函式
// export function provideRadioGroupContext(value: RadioGroupContextValue) {
//   provide(RadioGroupContextKey, value)
// }

// TODO: 建立 use 函式
// export function useRadioGroupContext(): RadioGroupContextValue {
//   const context = inject(RadioGroupContextKey)
//   if (!context) {
//     throw new Error('useRadioGroupContext must be used within <RadioGroup.Root>')
//   }
//   return context
// }
