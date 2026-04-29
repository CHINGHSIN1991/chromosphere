import DialogRootComponent from './DialogRoot.vue'
import DialogTriggerComponent from './DialogTrigger.vue'
import DialogBackdropComponent from './DialogBackdrop.vue'
import DialogPositionerComponent from './DialogPositioner.vue'
import DialogContentComponent from './DialogContent.vue'
import DialogTitleComponent from './DialogTitle.vue'
import DialogDescriptionComponent from './DialogDescription.vue'
import DialogCloseTriggerComponent from './DialogCloseTrigger.vue'

// Namespace 物件（讓使用者可以用 <Dialog.Root> 等語法）
export const Dialog = {
  Root: DialogRootComponent,
  Trigger: DialogTriggerComponent,
  Backdrop: DialogBackdropComponent,
  Positioner: DialogPositionerComponent,
  Content: DialogContentComponent,
  Title: DialogTitleComponent,
  Description: DialogDescriptionComponent,
  CloseTrigger: DialogCloseTriggerComponent,
}
