import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

// =============================================================================
// TODO: 定義 Tooltip 的 Vue Provide/Inject Context
// =============================================================================
//
// 💡 提示：
// Vue 使用 provide/inject 代替 React 的 Context
//
// 1. 定義 Context 型別（TooltipContextValue interface）
// 2. 建立 InjectionKey（型別安全的 inject key）
// 3. 建立 provideTooltipContext 函式（在 Root 呼叫）
// 4. 建立 useTooltipContext 函式（在子元件呼叫），加上錯誤處理
//
// Context 需要包含：
//   - open: boolean  →  Tooltip 是否顯示
//   - setOpen: (open: boolean) => void  →  控制顯示狀態
//   - contentId: string  →  Content 的 id（供 Trigger aria-describedby 使用）
//
// 📖 參考：
// - Vue provide/inject: https://vuejs.org/guide/components/provide-inject
// - Ark UI Vue Context 範例：https://github.com/chakra-ui/ark/blob/main/packages/vue/src/utils/inject-context.ts
// =============================================================================

// TODO: 定義 TooltipContextValue interface
// export interface TooltipContextValue {
//   open: boolean
//   setOpen: (open: boolean) => void
//   contentId: string
// }

// TODO: 建立 InjectionKey
// const TooltipContextKey: InjectionKey<TooltipContextValue> = Symbol('TooltipContext')

// TODO: 建立 provide 函式
// export function provideTooltipContext(value: TooltipContextValue) {
//   provide(TooltipContextKey, value)
// }

// TODO: 建立 use 函式
// export function useTooltipContext(): TooltipContextValue {
//   const context = inject(TooltipContextKey)
//   if (!context) {
//     throw new Error('useTooltipContext must be used within <Tooltip.Root>')
//   }
//   return context
// }
