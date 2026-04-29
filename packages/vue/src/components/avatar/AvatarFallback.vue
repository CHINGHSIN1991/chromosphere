<script setup lang="ts">
// =============================================================================
// TODO: 實作 AvatarFallback Vue 元件
// =============================================================================
//
// 功能說明：圖片載入失敗時顯示的替代內容（文字縮寫或圖示）
//
// 💡 提示：
// Step 1 — 從 Context 取得狀態
//   import { useAvatarContext } from './avatar-context'
//   const context = useAvatarContext()
//
// Step 2 — 計算 ARIA 屬性（使用 computed）
//
// Step 3 — 事件處理（使用 defineEmits 或直接呼叫 context 方法）
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/
// - Ark UI AvatarFallback Vue 版本：
//   https://github.com/chakra-ui/ark/blob/main/packages/vue/src/components/avatar/AvatarFallback.vue
// =============================================================================

// TODO: 從 Context 讀取狀態
// const context = useAvatarContext()
</script>

<template>
  <!-- TODO: 渲染 <span> 並加上 ARIA 屬性 -->
  <span v-bind="$attrs">
    <slot />
  </span>
</template>
