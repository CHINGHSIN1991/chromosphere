import DialogRootComponent from './DialogRoot.svelte'
import DialogTriggerComponent from './DialogTrigger.svelte'
import DialogBackdropComponent from './DialogBackdrop.svelte'
import DialogPositionerComponent from './DialogPositioner.svelte'
import DialogContentComponent from './DialogContent.svelte'
import DialogTitleComponent from './DialogTitle.svelte'
import DialogDescriptionComponent from './DialogDescription.svelte'
import DialogCloseTriggerComponent from './DialogCloseTrigger.svelte'

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
