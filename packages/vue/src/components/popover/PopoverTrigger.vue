<script setup lang="ts">
// =============================================================================
// TODO: 實作 PopoverTrigger Vue 元件
// =============================================================================
//
// 功能說明：觸發 Popover 的按鈕
//
// 💡 提示：
// Step 1 — 從 Context 取得狀態
//   import { usePopoverContext } from './popover-context'
//   const context = usePopoverContext()
//
// Step 2 — 計算 ARIA 屬性（使用 computed）
//
// Step 3 — 事件處理（使用 defineEmits 或直接呼叫 context 方法）
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/popover/
// - Ark UI PopoverTrigger Vue 版本：
//   https://github.com/chakra-ui/ark/blob/main/packages/vue/src/components/popover/PopoverTrigger.vue
// =============================================================================

// TODO: 從 Context 讀取狀態
// const context = usePopoverContext()
</script>

<template>
  <!-- TODO: 渲染 <button> 並加上 ARIA 屬性 -->
  <button v-bind="$attrs">
    <slot />
  </button>
</template>
