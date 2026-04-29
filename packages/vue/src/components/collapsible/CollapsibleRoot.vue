<script setup lang="ts">
// =============================================================================
// TODO: 實作 CollapsibleRoot Vue 元件
// =============================================================================
//
// 💡 提示：
// Step 1 — 定義 Props（使用 withDefaults + defineProps）
//   - value?（受控）/ defaultValue?（非受控）
//   - onValueChange?: 狀態改變的回調
//   - disabled?: boolean
//
// Step 2 — 狀態管理（使用 ref 或 reactive）
//   const internalValue = ref(props.defaultValue ?? ...)
//   const currentValue = computed(() => props.value ?? internalValue.value)
//
// Step 3 — Provide Context（使用 provideCollapsibleContext）
//   在 setup 中 provide context 給子元件
//
// 架構重點：
// - Trigger 需要 aria-expanded 和 aria-controls
// - Content 需要 id 對應 Trigger 的 aria-controls
//
// 📖 參考：
// - Vue Composition API: https://vuejs.org/guide/extras/composition-api-faq
// - provide/inject: https://vuejs.org/guide/components/provide-inject
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
// - Zag.js 參考: https://zagjs.com/components/react/collapsible
// =============================================================================

// TODO: import provide function
// import { provideCollapsibleContext } from './collapsible-context'

// TODO: 定義 Props
// const props = withDefaults(defineProps<{
//   value?: ...
//   defaultValue?: ...
//   onValueChange?: (value: ...) => void
//   disabled?: boolean
// }>(), {})

// TODO: 狀態管理（ref + computed）

// TODO: Provide context
// provideCollapsibleContext({ ... })
</script>

<template>
  <!-- TODO: 渲染根容器 -->
  <!-- 提示：加上 data-state 屬性供 CSS 使用 -->
  <div v-bind="$attrs">
    <slot />
  </div>
</template>
