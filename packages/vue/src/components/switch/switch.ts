import SwitchRootComponent from './SwitchRoot.vue'
import SwitchLabelComponent from './SwitchLabel.vue'
import SwitchControlComponent from './SwitchControl.vue'
import SwitchThumbComponent from './SwitchThumb.vue'
import SwitchHiddenInputComponent from './SwitchHiddenInput.vue'

// Namespace 物件（讓使用者可以用 <Switch.Root> 等語法）
export const Switch = {
  Root: SwitchRootComponent,
  Label: SwitchLabelComponent,
  Control: SwitchControlComponent,
  Thumb: SwitchThumbComponent,
  HiddenInput: SwitchHiddenInputComponent,
}
