import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

// =============================================================================
// TODO: 定義 Popover 的 Vue Provide/Inject Context
// =============================================================================
//
// 💡 提示：
// Vue 使用 provide/inject 代替 React 的 Context
//
// 1. 定義 Context 型別（PopoverContextValue interface）
// 2. 建立 InjectionKey（型別安全的 inject key）
// 3. 建立 providePopoverContext 函式（在 Root 呼叫）
// 4. 建立 usePopoverContext 函式（在子元件呼叫），加上錯誤處理
//
// Context 需要包含：
//   - open: boolean  →  Popover 是否開啟
//   - setOpen: (open: boolean) => void  →  控制 open 狀態
//
// 📖 參考：
// - Vue provide/inject: https://vuejs.org/guide/components/provide-inject
// - Ark UI Vue Context 範例：https://github.com/chakra-ui/ark/blob/main/packages/vue/src/utils/inject-context.ts
// =============================================================================

// TODO: 定義 PopoverContextValue interface
// export interface PopoverContextValue {
//   open: boolean
//   setOpen: (open: boolean) => void
// }

// TODO: 建立 InjectionKey
// const PopoverContextKey: InjectionKey<PopoverContextValue> = Symbol('PopoverContext')

// TODO: 建立 provide 函式
// export function providePopoverContext(value: PopoverContextValue) {
//   provide(PopoverContextKey, value)
// }

// TODO: 建立 use 函式
// export function usePopoverContext(): PopoverContextValue {
//   const context = inject(PopoverContextKey)
//   if (!context) {
//     throw new Error('usePopoverContext must be used within <Popover.Root>')
//   }
//   return context
// }
