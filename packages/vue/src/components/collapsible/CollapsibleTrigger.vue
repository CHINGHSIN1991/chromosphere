<script setup lang="ts">
// =============================================================================
// TODO: 實作 CollapsibleTrigger Vue 元件
// =============================================================================
//
// 功能說明：觸發展開/收合的按鈕
//
// 💡 提示：
// Step 1 — 從 Context 取得狀態
//   import { useCollapsibleContext } from './collapsible-context'
//   const context = useCollapsibleContext()
//
// Step 2 — 計算 ARIA 屬性（使用 computed）
//
// Step 3 — 事件處理（使用 defineEmits 或直接呼叫 context 方法）
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
// - Ark UI CollapsibleTrigger Vue 版本：
//   https://github.com/chakra-ui/ark/blob/main/packages/vue/src/components/collapsible/CollapsibleTrigger.vue
// =============================================================================

// TODO: 從 Context 讀取狀態
// const context = useCollapsibleContext()
</script>

<template>
  <!-- TODO: 渲染 <button> 並加上 ARIA 屬性 -->
  <button v-bind="$attrs">
    <slot />
  </button>
</template>
