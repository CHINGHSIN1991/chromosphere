<script setup lang="ts">
// =============================================================================
// TODO: 實作 CheckboxHiddenInput Vue 元件
// =============================================================================
//
// 功能說明：真實的 input[type="checkbox"]（視覺隱藏，供表單使用）
//
// 💡 提示：
// Step 1 — 從 Context 取得狀態
//   import { useCheckboxContext } from './checkbox-context'
//   const context = useCheckboxContext()
//
// Step 2 — 計算 ARIA 屬性（使用 computed）
//
// Step 3 — 事件處理（使用 defineEmits 或直接呼叫 context 方法）
//
// 📖 參考：
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
// - Ark UI CheckboxHiddenInput Vue 版本：
//   https://github.com/chakra-ui/ark/blob/main/packages/vue/src/components/checkbox/CheckboxHiddenInput.vue
// =============================================================================

// TODO: 從 Context 讀取狀態
// const context = useCheckboxContext()
</script>

<template>
  <!-- TODO: 渲染 <input> 並加上 ARIA 屬性 -->
  <input v-bind="$attrs">
    <slot />
  </input>
</template>
