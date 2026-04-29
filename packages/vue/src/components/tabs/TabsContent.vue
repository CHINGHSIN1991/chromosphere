<script setup lang="ts">
// =============================================================================
// TODO: 實作 TabsContent Vue 元件
// =============================================================================
//
// 功能說明：Tab 對應的內容區域（role="tabpanel"）
//
// 💡 提示：
// Step 1 — 從 Context 取得狀態
//   import { useTabsContext } from './tabs-context'
//   const context = useTabsContext()
//
// Step 2 — 計算 ARIA 屬性（使用 computed）
//
// Step 3 — 事件處理（使用 defineEmits 或直接呼叫 context 方法）
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
// - Ark UI TabsContent Vue 版本：
//   https://github.com/chakra-ui/ark/blob/main/packages/vue/src/components/tabs/TabsContent.vue
// =============================================================================

// TODO: 從 Context 讀取狀態
// const context = useTabsContext()
</script>

<template>
  <!-- TODO: 渲染 <div> 並加上 ARIA 屬性 -->
  <div v-bind="$attrs">
    <slot />
  </div>
</template>
