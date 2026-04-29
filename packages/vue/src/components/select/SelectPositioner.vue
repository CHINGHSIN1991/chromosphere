<script setup lang="ts">
// =============================================================================
// TODO: 實作 SelectPositioner Vue 元件
// =============================================================================
//
// 功能說明：下拉選單的定位容器
//
// 💡 提示：
// Step 1 — 從 Context 取得狀態
//   import { useSelectContext } from './select-context'
//   const context = useSelectContext()
//
// Step 2 — 計算 ARIA 屬性（使用 computed）
//
// Step 3 — 事件處理（使用 defineEmits 或直接呼叫 context 方法）
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
// - Ark UI SelectPositioner Vue 版本：
//   https://github.com/chakra-ui/ark/blob/main/packages/vue/src/components/select/SelectPositioner.vue
// =============================================================================

// TODO: 從 Context 讀取狀態
// const context = useSelectContext()
</script>

<template>
  <!-- TODO: 渲染 <div> 並加上 ARIA 屬性 -->
  <div v-bind="$attrs">
    <slot />
  </div>
</template>
