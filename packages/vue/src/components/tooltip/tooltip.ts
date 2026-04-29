import TooltipRootComponent from './TooltipRoot.vue'
import TooltipTriggerComponent from './TooltipTrigger.vue'
import TooltipPositionerComponent from './TooltipPositioner.vue'
import TooltipContentComponent from './TooltipContent.vue'
import TooltipArrowComponent from './TooltipArrow.vue'
import TooltipArrowTipComponent from './TooltipArrowTip.vue'

// Namespace 物件（讓使用者可以用 <Tooltip.Root> 等語法）
export const Tooltip = {
  Root: TooltipRootComponent,
  Trigger: TooltipTriggerComponent,
  Positioner: TooltipPositionerComponent,
  Content: TooltipContentComponent,
  Arrow: TooltipArrowComponent,
  ArrowTip: TooltipArrowTipComponent,
}
