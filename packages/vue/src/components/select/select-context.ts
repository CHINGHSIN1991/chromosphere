import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

// =============================================================================
// TODO: 定義 Select 的 Vue Provide/Inject Context
// =============================================================================
//
// 💡 提示：
// Vue 使用 provide/inject 代替 React 的 Context
//
// 1. 定義 Context 型別（SelectContextValue interface）
// 2. 建立 InjectionKey（型別安全的 inject key）
// 3. 建立 provideSelectContext 函式（在 Root 呼叫）
// 4. 建立 useSelectContext 函式（在子元件呼叫），加上錯誤處理
//
// Context 需要包含：
//   - value: string | string[]  →  選中的值（支援單選和多選）
//   - setValue: (value: string | string[]) => void  →  更新選中值
//   - open: boolean  →  下拉選單是否展開
//   - setOpen: (open: boolean) => void  →  控制展開狀態
//   - multiple: boolean  →  是否允許多選
//
// 📖 參考：
// - Vue provide/inject: https://vuejs.org/guide/components/provide-inject
// - Ark UI Vue Context 範例：https://github.com/chakra-ui/ark/blob/main/packages/vue/src/utils/inject-context.ts
// =============================================================================

// TODO: 定義 SelectContextValue interface
// export interface SelectContextValue {
//   value: string | string[]
//   setValue: (value: string | string[]) => void
//   open: boolean
//   setOpen: (open: boolean) => void
//   multiple: boolean
// }

// TODO: 建立 InjectionKey
// const SelectContextKey: InjectionKey<SelectContextValue> = Symbol('SelectContext')

// TODO: 建立 provide 函式
// export function provideSelectContext(value: SelectContextValue) {
//   provide(SelectContextKey, value)
// }

// TODO: 建立 use 函式
// export function useSelectContext(): SelectContextValue {
//   const context = inject(SelectContextKey)
//   if (!context) {
//     throw new Error('useSelectContext must be used within <Select.Root>')
//   }
//   return context
// }
