<script setup lang="ts">
// =============================================================================
// TODO: 實作 TooltipRoot Vue 元件
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
// Step 3 — Provide Context（使用 provideTooltipContext）
//   在 setup 中 provide context 給子元件
//
// 架構重點：
// - Trigger 的 aria-describedby 指向 Content 的 id
// - Content 需要 role="tooltip"
//
// 📖 參考：
// - Vue Composition API: https://vuejs.org/guide/extras/composition-api-faq
// - provide/inject: https://vuejs.org/guide/components/provide-inject
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
// - Zag.js 參考: https://zagjs.com/components/react/tooltip
// =============================================================================

// TODO: import provide function
// import { provideTooltipContext } from './tooltip-context'

// TODO: 定義 Props
// const props = withDefaults(defineProps<{
//   value?: ...
//   defaultValue?: ...
//   onValueChange?: (value: ...) => void
//   disabled?: boolean
// }>(), {})

// TODO: 狀態管理（ref + computed）

// TODO: Provide context
// provideTooltipContext({ ... })
</script>

<template>
  <!-- TODO: 渲染根容器 -->
  <!-- 提示：加上 data-state 屬性供 CSS 使用 -->
  <div v-bind="$attrs">
    <slot />
  </div>
</template>
