<script setup lang="ts">
// =============================================================================
// TODO: 實作 AccordionItemTrigger Vue 元件
// =============================================================================
//
// 功能說明：點擊觸發展開/收合
//
// 💡 提示：
// Step 1 — 從 Context 取得狀態
//   import { useAccordionContext } from './accordion-context'
//   const context = useAccordionContext()
//
// Step 2 — 計算 ARIA 屬性（使用 computed）
//
// Step 3 — 事件處理（使用 defineEmits 或直接呼叫 context 方法）
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
// - Ark UI AccordionItemTrigger Vue 版本：
//   https://github.com/chakra-ui/ark/blob/main/packages/vue/src/components/accordion/AccordionItemTrigger.vue
// =============================================================================

// TODO: 從 Context 讀取狀態
// const context = useAccordionContext()
</script>

<template>
  <!-- TODO: 渲染 <button> 並加上 ARIA 屬性 -->
  <button v-bind="$attrs">
    <slot />
  </button>
</template>
