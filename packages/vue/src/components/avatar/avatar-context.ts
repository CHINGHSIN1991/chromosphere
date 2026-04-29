import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

// =============================================================================
// TODO: 定義 Avatar 的 Vue Provide/Inject Context
// =============================================================================
//
// 💡 提示：
// Vue 使用 provide/inject 代替 React 的 Context
//
// 1. 定義 Context 型別（AvatarContextValue interface）
// 2. 建立 InjectionKey（型別安全的 inject key）
// 3. 建立 provideAvatarContext 函式（在 Root 呼叫）
// 4. 建立 useAvatarContext 函式（在子元件呼叫），加上錯誤處理
//
// Context 需要包含：
//   - status: "loading" | "loaded" | "error"  →  圖片載入狀態
//   - setStatus: (status: "loading" | "loaded" | "error") => void  →  更新載入狀態
//
// 📖 參考：
// - Vue provide/inject: https://vuejs.org/guide/components/provide-inject
// - Ark UI Vue Context 範例：https://github.com/chakra-ui/ark/blob/main/packages/vue/src/utils/inject-context.ts
// =============================================================================

// TODO: 定義 AvatarContextValue interface
// export interface AvatarContextValue {
//   status: "loading" | "loaded" | "error"
//   setStatus: (status: "loading" | "loaded" | "error") => void
// }

// TODO: 建立 InjectionKey
// const AvatarContextKey: InjectionKey<AvatarContextValue> = Symbol('AvatarContext')

// TODO: 建立 provide 函式
// export function provideAvatarContext(value: AvatarContextValue) {
//   provide(AvatarContextKey, value)
// }

// TODO: 建立 use 函式
// export function useAvatarContext(): AvatarContextValue {
//   const context = inject(AvatarContextKey)
//   if (!context) {
//     throw new Error('useAvatarContext must be used within <Avatar.Root>')
//   }
//   return context
// }
