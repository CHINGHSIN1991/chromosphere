<script lang="ts">
  // ===========================================================================
  // TODO: 實作 TooltipTrigger（Svelte 5 版）
  // ===========================================================================
  //
  // 功能說明：觸發 Tooltip 顯示的元素
  //
  // 💡 提示：
  // Step 1 — 從 Context 讀取狀態
  //   import { getTooltipContext } from './tooltip-context.svelte.ts'
  //   const context = getTooltipContext()
  //
  // Step 2 — 計算 ARIA 屬性（使用 $derived）
  //   const isExpanded = $derived(context.value === props.value)
  //
  // Step 3 — 事件處理（Svelte 5 用 onclick 代替 on:click）
  //
  // 📖 參考：
  // - Svelte 5 $derived: https://svelte.dev/docs/svelte/$derived
  // - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
  // - Ark UI TooltipTrigger Svelte 版本：
  //   https://github.com/chakra-ui/ark/blob/main/packages/svelte/src/lib/components/tooltip/TooltipTrigger.svelte
  // ===========================================================================

  // TODO: import context
  // const context = getTooltipContext()

  // TODO: $derived 計算屬性
</script>

<!-- TODO: 渲染 <button> 並加上 ARIA 屬性 -->
<button>
  {@render children?.()}
</button>
