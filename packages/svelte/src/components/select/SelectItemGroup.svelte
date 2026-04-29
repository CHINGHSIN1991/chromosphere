<script lang="ts">
  // ===========================================================================
  // TODO: 實作 SelectItemGroup（Svelte 5 版）
  // ===========================================================================
  //
  // 功能說明：選項分組容器（role="group"）
  //
  // 💡 提示：
  // Step 1 — 從 Context 讀取狀態
  //   import { getSelectContext } from './select-context.svelte.ts'
  //   const context = getSelectContext()
  //
  // Step 2 — 計算 ARIA 屬性（使用 $derived）
  //   const isExpanded = $derived(context.value === props.value)
  //
  // Step 3 — 事件處理（Svelte 5 用 onclick 代替 on:click）
  //
  // 📖 參考：
  // - Svelte 5 $derived: https://svelte.dev/docs/svelte/$derived
  // - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
  // - Ark UI SelectItemGroup Svelte 版本：
  //   https://github.com/chakra-ui/ark/blob/main/packages/svelte/src/lib/components/select/SelectItemGroup.svelte
  // ===========================================================================

  // TODO: import context
  // const context = getSelectContext()

  // TODO: $derived 計算屬性
</script>

<!-- TODO: 渲染 <div> 並加上 ARIA 屬性 -->
<div>
  {@render children?.()}
</div>
