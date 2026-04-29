import PopoverRootComponent from './PopoverRoot.vue'
import PopoverTriggerComponent from './PopoverTrigger.vue'
import PopoverAnchorComponent from './PopoverAnchor.vue'
import PopoverPositionerComponent from './PopoverPositioner.vue'
import PopoverContentComponent from './PopoverContent.vue'
import PopoverTitleComponent from './PopoverTitle.vue'
import PopoverDescriptionComponent from './PopoverDescription.vue'
import PopoverCloseTriggerComponent from './PopoverCloseTrigger.vue'
import PopoverArrowComponent from './PopoverArrow.vue'
import PopoverArrowTipComponent from './PopoverArrowTip.vue'

// Namespace 物件（讓使用者可以用 <Popover.Root> 等語法）
export const Popover = {
  Root: PopoverRootComponent,
  Trigger: PopoverTriggerComponent,
  Anchor: PopoverAnchorComponent,
  Positioner: PopoverPositionerComponent,
  Content: PopoverContentComponent,
  Title: PopoverTitleComponent,
  Description: PopoverDescriptionComponent,
  CloseTrigger: PopoverCloseTriggerComponent,
  Arrow: PopoverArrowComponent,
  ArrowTip: PopoverArrowTipComponent,
}
