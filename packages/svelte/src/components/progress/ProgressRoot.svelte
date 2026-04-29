<script lang="ts">
  // ===========================================================================
  // TODO: 實作 ProgressRoot（Svelte 5 版）
  // ===========================================================================
  //
  // 💡 提示（Svelte 5 Runes）：
  // - 使用 $props() 取得 props（代替 export let）
  // - 使用 $state() 建立反應式狀態
  // - 使用 setContext / setProgressContext 把狀態分享給子元件
  //
  // 架構重點：
  // - Root 可以渲染一個 div 但要加上 role="progressbar"
  // - aria-valuenow={value}、aria-valuemin={min}、aria-valuemax={max}
  //
  // 📖 參考：
  // - Svelte 5 $props: https://svelte.dev/docs/svelte/$props
  // - Svelte 5 $state: https://svelte.dev/docs/svelte/$state
  // - ARIA Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/meter/
  // - Zag.js 參考: https://zagjs.com/components/react/progress
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
  // setProgressContext({ ... })
</script>

<!-- TODO: 渲染根容器 -->
<!-- 提示：加上 data-state 屬性供 CSS 使用 -->
<div>
  {@render children?.()}
</div>
