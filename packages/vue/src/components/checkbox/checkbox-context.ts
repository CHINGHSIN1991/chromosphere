import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

// =============================================================================
// TODO: 定義 Checkbox 的 Vue Provide/Inject Context
// =============================================================================
//
// 💡 提示：
// Vue 使用 provide/inject 代替 React 的 Context
//
// 1. 定義 Context 型別（CheckboxContextValue interface）
// 2. 建立 InjectionKey（型別安全的 inject key）
// 3. 建立 provideCheckboxContext 函式（在 Root 呼叫）
// 4. 建立 useCheckboxContext 函式（在子元件呼叫），加上錯誤處理
//
// Context 需要包含：
//   - checked: boolean | "indeterminate"  →  勾選狀態（支援不確定狀態）
//   - setChecked: (checked: boolean | "indeterminate") => void  →  更新狀態
//   - disabled: boolean  →  是否禁用
//   - inputId: string  →  HiddenInput 的 id
//
// 📖 參考：
// - Vue provide/inject: https://vuejs.org/guide/components/provide-inject
// - Ark UI Vue Context 範例：https://github.com/chakra-ui/ark/blob/main/packages/vue/src/utils/inject-context.ts
// =============================================================================

// TODO: 定義 CheckboxContextValue interface
// export interface CheckboxContextValue {
//   checked: boolean | "indeterminate"
//   setChecked: (checked: boolean | "indeterminate") => void
//   disabled: boolean
//   inputId: string
// }

// TODO: 建立 InjectionKey
// const CheckboxContextKey: InjectionKey<CheckboxContextValue> = Symbol('CheckboxContext')

// TODO: 建立 provide 函式
// export function provideCheckboxContext(value: CheckboxContextValue) {
//   provide(CheckboxContextKey, value)
// }

// TODO: 建立 use 函式
// export function useCheckboxContext(): CheckboxContextValue {
//   const context = inject(CheckboxContextKey)
//   if (!context) {
//     throw new Error('useCheckboxContext must be used within <Checkbox.Root>')
//   }
//   return context
// }
