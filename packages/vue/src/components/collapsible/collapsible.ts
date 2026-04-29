import CollapsibleRootComponent from './CollapsibleRoot.vue'
import CollapsibleTriggerComponent from './CollapsibleTrigger.vue'
import CollapsibleContentComponent from './CollapsibleContent.vue'

// Namespace 物件（讓使用者可以用 <Collapsible.Root> 等語法）
export const Collapsible = {
  Root: CollapsibleRootComponent,
  Trigger: CollapsibleTriggerComponent,
  Content: CollapsibleContentComponent,
}
