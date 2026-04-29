import CheckboxRootComponent from './CheckboxRoot.vue'
import CheckboxLabelComponent from './CheckboxLabel.vue'
import CheckboxControlComponent from './CheckboxControl.vue'
import CheckboxIndicatorComponent from './CheckboxIndicator.vue'
import CheckboxHiddenInputComponent from './CheckboxHiddenInput.vue'

// Namespace 物件（讓使用者可以用 <Checkbox.Root> 等語法）
export const Checkbox = {
  Root: CheckboxRootComponent,
  Label: CheckboxLabelComponent,
  Control: CheckboxControlComponent,
  Indicator: CheckboxIndicatorComponent,
  HiddenInput: CheckboxHiddenInputComponent,
}
