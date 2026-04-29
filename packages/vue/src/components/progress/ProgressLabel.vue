<script setup lang="ts">
// =============================================================================
// TODO: 實作 ProgressLabel Vue 元件
// =============================================================================
//
// 功能說明：進度條說明文字
//
// 💡 提示：
// Step 1 — 從 Context 取得狀態
//   import { useProgressContext } from './progress-context'
//   const context = useProgressContext()
//
// Step 2 — 計算 ARIA 屬性（使用 computed）
//
// Step 3 — 事件處理（使用 defineEmits 或直接呼叫 context 方法）
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/meter/
// - Ark UI ProgressLabel Vue 版本：
//   https://github.com/chakra-ui/ark/blob/main/packages/vue/src/components/progress/ProgressLabel.vue
// =============================================================================

// TODO: 從 Context 讀取狀態
// const context = useProgressContext()
</script>

<template>
  <!-- TODO: 渲染 <label> 並加上 ARIA 屬性 -->
  <label v-bind="$attrs">
    <slot />
  </label>
</template>
