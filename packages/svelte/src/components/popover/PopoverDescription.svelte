<script lang="ts">
  // ===========================================================================
  // TODO: 實作 PopoverDescription（Svelte 5 版）
  // ===========================================================================
  //
  // 功能說明：Popover 描述
  //
  // 💡 提示：
  // Step 1 — 從 Context 讀取狀態
  //   import { getPopoverContext } from './popover-context.svelte.ts'
  //   const context = getPopoverContext()
  //
  // Step 2 — 計算 ARIA 屬性（使用 $derived）
  //   const isExpanded = $derived(context.value === props.value)
  //
  // Step 3 — 事件處理（Svelte 5 用 onclick 代替 on:click）
  //
  // 📖 參考：
  // - Svelte 5 $derived: https://svelte.dev/docs/svelte/$derived
  // - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/popover/
  // - Ark UI PopoverDescription Svelte 版本：
  //   https://github.com/chakra-ui/ark/blob/main/packages/svelte/src/lib/components/popover/PopoverDescription.svelte
  // ===========================================================================

  // TODO: import context
  // const context = getPopoverContext()

  // TODO: $derived 計算屬性
</script>

<!-- TODO: 渲染 <p> 並加上 ARIA 屬性 -->
<p>
  {@render children?.()}
</p>
