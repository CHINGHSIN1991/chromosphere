<script lang="ts">
  // ===========================================================================
  // TODO: 實作 TabsContent（Svelte 5 版）
  // ===========================================================================
  //
  // 功能說明：Tab 對應的內容區域（role="tabpanel"）
  //
  // 💡 提示：
  // Step 1 — 從 Context 讀取狀態
  //   import { getTabsContext } from './tabs-context.svelte.ts'
  //   const context = getTabsContext()
  //
  // Step 2 — 計算 ARIA 屬性（使用 $derived）
  //   const isExpanded = $derived(context.value === props.value)
  //
  // Step 3 — 事件處理（Svelte 5 用 onclick 代替 on:click）
  //
  // 📖 參考：
  // - Svelte 5 $derived: https://svelte.dev/docs/svelte/$derived
  // - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
  // - Ark UI TabsContent Svelte 版本：
  //   https://github.com/chakra-ui/ark/blob/main/packages/svelte/src/lib/components/tabs/TabsContent.svelte
  // ===========================================================================

  // TODO: import context
  // const context = getTabsContext()

  // TODO: $derived 計算屬性
</script>

<!-- TODO: 渲染 <div> 並加上 ARIA 屬性 -->
<div>
  {@render children?.()}
</div>
