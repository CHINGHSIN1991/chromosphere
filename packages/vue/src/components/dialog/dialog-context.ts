import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

// =============================================================================
// TODO: 定義 Dialog 的 Vue Provide/Inject Context
// =============================================================================
//
// 💡 提示：
// Vue 使用 provide/inject 代替 React 的 Context
//
// 1. 定義 Context 型別（DialogContextValue interface）
// 2. 建立 InjectionKey（型別安全的 inject key）
// 3. 建立 provideDialogContext 函式（在 Root 呼叫）
// 4. 建立 useDialogContext 函式（在子元件呼叫），加上錯誤處理
//
// Context 需要包含：
//   - open: boolean  →  Dialog 是否開啟
//   - setOpen: (open: boolean) => void  →  控制 open 狀態
//   - contentId: string  →  Dialog content 的唯一 id（供 ARIA 使用）
//   - titleId: string  →  Dialog title 的唯一 id
//   - descriptionId: string  →  Dialog description 的唯一 id
//
// 📖 參考：
// - Vue provide/inject: https://vuejs.org/guide/components/provide-inject
// - Ark UI Vue Context 範例：https://github.com/chakra-ui/ark/blob/main/packages/vue/src/utils/inject-context.ts
// =============================================================================

// TODO: 定義 DialogContextValue interface
// export interface DialogContextValue {
//   open: boolean
//   setOpen: (open: boolean) => void
//   contentId: string
//   titleId: string
//   descriptionId: string
// }

// TODO: 建立 InjectionKey
// const DialogContextKey: InjectionKey<DialogContextValue> = Symbol('DialogContext')

// TODO: 建立 provide 函式
// export function provideDialogContext(value: DialogContextValue) {
//   provide(DialogContextKey, value)
// }

// TODO: 建立 use 函式
// export function useDialogContext(): DialogContextValue {
//   const context = inject(DialogContextKey)
//   if (!context) {
//     throw new Error('useDialogContext must be used within <Dialog.Root>')
//   }
//   return context
// }
