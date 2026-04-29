import AccordionRootComponent from './AccordionRoot.vue'
import AccordionItemComponent from './AccordionItem.vue'
import AccordionItemTriggerComponent from './AccordionItemTrigger.vue'
import AccordionItemContentComponent from './AccordionItemContent.vue'

// Namespace 物件（讓使用者可以用 <Accordion.Root> 等語法）
export const Accordion = {
  Root: AccordionRootComponent,
  Item: AccordionItemComponent,
  ItemTrigger: AccordionItemTriggerComponent,
  ItemContent: AccordionItemContentComponent,
}
