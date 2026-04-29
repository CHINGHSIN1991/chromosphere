<script setup lang="ts">
// =============================================================================
// TODO: 實作 DialogContent Vue 元件
// =============================================================================
//
// 功能說明：Dialog 主體內容（role="dialog"）
//
// 💡 提示：
// Step 1 — 從 Context 取得狀態
//   import { useDialogContext } from './dialog-context'
//   const context = useDialogContext()
//
// Step 2 — 計算 ARIA 屬性（使用 computed）
//
// Step 3 — 事件處理（使用 defineEmits 或直接呼叫 context 方法）
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
// - Ark UI DialogContent Vue 版本：
//   https://github.com/chakra-ui/ark/blob/main/packages/vue/src/components/dialog/DialogContent.vue
// =============================================================================

// TODO: 從 Context 讀取狀態
// const context = useDialogContext()
</script>

<template>
  <!-- TODO: 渲染 <div> 並加上 ARIA 屬性 -->
  <div v-bind="$attrs">
    <slot />
  </div>
</template>
