<script lang="ts">
  // ===========================================================================
  // TODO: 實作 TooltipRoot（Svelte 5 版）
  // ===========================================================================
  //
  // 💡 提示（Svelte 5 Runes）：
  // - 使用 $props() 取得 props（代替 export let）
  // - 使用 $state() 建立反應式狀態
  // - 使用 setContext / setTooltipContext 把狀態分享給子元件
  //
  // 架構重點：
  // - Trigger 的 aria-describedby 指向 Content 的 id
  // - Content 需要 role="tooltip"
  //
  // 📖 參考：
  // - Svelte 5 $props: https://svelte.dev/docs/svelte/$props
  // - Svelte 5 $state: https://svelte.dev/docs/svelte/$state
  // - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
  // - Zag.js 參考: https://zagjs.com/components/react/tooltip
  // ===========================================================================

  // TODO: 定義 Props（Svelte 5 方式）
  // interface Props {
  //   value?: ...
  //   defaultValue?: ...
  //   onValueChange?: (value: ...) => void
  //   children?: import('svelte').Snippet
  // }
  // const { ...props }: Props = $props()

  // TODO: 狀態管理（$state）
  // let internalValue = $state(props.defaultValue ?? ...)

  // TODO: setContext
  // setTooltipContext({ ... })
</script>

<!-- TODO: 渲染根容器 -->
<!-- 提示：加上 data-state 屬性供 CSS 使用 -->
<div>
  {@render children?.()}
</div>
