// =============================================================================
// Collapsible 元件匯出入口
// =============================================================================
//
// 提供兩種匯入方式：
//
// 方式 1 — 直接匯入（具名）：
//   import { CollapsibleRoot, CollapsibleTrigger } from '@chromosphere/react/collapsible'
//
// 方式 2 — Namespace 匯入：
//   import { Collapsible } from '@chromosphere/react/collapsible'
//   <Collapsible.Root> ...
// =============================================================================

// 具名匯出
export { CollapsibleRoot, type CollapsibleRootProps } from './collapsible-root'
export { CollapsibleTrigger, type CollapsibleTriggerProps } from './collapsible-trigger'
export { CollapsibleContent, type CollapsibleContentProps } from './collapsible-content'

// Namespace 匯出
export * as Collapsible from './collapsible'
