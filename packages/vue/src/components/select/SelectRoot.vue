<script setup lang="ts">
// =============================================================================
// TODO: 實作 SelectRoot Vue 元件
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
// Step 3 — Provide Context（使用 provideSelectContext）
//   在 setup 中 provide context 給子元件
//
// 架構重點：
// - Content 需要 role="listbox"，Item 需要 role="option"
// - Trigger 的 aria-haspopup="listbox"，aria-expanded 指向 open 狀態
//
// 📖 參考：
// - Vue Composition API: https://vuejs.org/guide/extras/composition-api-faq
// - provide/inject: https://vuejs.org/guide/components/provide-inject
// - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
// - Zag.js 參考: https://zagjs.com/components/react/select
// =============================================================================

// TODO: import provide function
// import { provideSelectContext } from './select-context'

// TODO: 定義 Props
// const props = withDefaults(defineProps<{
//   value?: ...
//   defaultValue?: ...
//   onValueChange?: (value: ...) => void
//   disabled?: boolean
// }>(), {})

// TODO: 狀態管理（ref + computed）

// TODO: Provide context
// provideSelectContext({ ... })
</script>

<template>
  <!-- TODO: 渲染根容器 -->
  <!-- 提示：加上 data-state 屬性供 CSS 使用 -->
  <div v-bind="$attrs">
    <slot />
  </div>
</template>
