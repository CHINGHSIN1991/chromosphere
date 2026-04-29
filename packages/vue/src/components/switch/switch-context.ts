import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

// =============================================================================
// TODO: 定義 Switch 的 Vue Provide/Inject Context
// =============================================================================
//
// 💡 提示：
// Vue 使用 provide/inject 代替 React 的 Context
//
// 1. 定義 Context 型別（SwitchContextValue interface）
// 2. 建立 InjectionKey（型別安全的 inject key）
// 3. 建立 provideSwitchContext 函式（在 Root 呼叫）
// 4. 建立 useSwitchContext 函式（在子元件呼叫），加上錯誤處理
//
// Context 需要包含：
//   - checked: boolean  →  開關狀態
//   - setChecked: (checked: boolean) => void  →  切換狀態
//   - disabled: boolean  →  是否禁用
//
// 📖 參考：
// - Vue provide/inject: https://vuejs.org/guide/components/provide-inject
// - Ark UI Vue Context 範例：https://github.com/chakra-ui/ark/blob/main/packages/vue/src/utils/inject-context.ts
// =============================================================================

// TODO: 定義 SwitchContextValue interface
// export interface SwitchContextValue {
//   checked: boolean
//   setChecked: (checked: boolean) => void
//   disabled: boolean
// }

// TODO: 建立 InjectionKey
// const SwitchContextKey: InjectionKey<SwitchContextValue> = Symbol('SwitchContext')

// TODO: 建立 provide 函式
// export function provideSwitchContext(value: SwitchContextValue) {
//   provide(SwitchContextKey, value)
// }

// TODO: 建立 use 函式
// export function useSwitchContext(): SwitchContextValue {
//   const context = inject(SwitchContextKey)
//   if (!context) {
//     throw new Error('useSwitchContext must be used within <Switch.Root>')
//   }
//   return context
// }
