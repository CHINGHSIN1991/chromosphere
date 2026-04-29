import RadioGroupRootComponent from './RadioGroupRoot.vue'
import RadioGroupLabelComponent from './RadioGroupLabel.vue'
import RadioGroupItemComponent from './RadioGroupItem.vue'
import RadioGroupItemControlComponent from './RadioGroupItemControl.vue'
import RadioGroupItemTextComponent from './RadioGroupItemText.vue'
import RadioGroupItemHiddenInputComponent from './RadioGroupItemHiddenInput.vue'

// Namespace 物件（讓使用者可以用 <RadioGroup.Root> 等語法）
export const RadioGroup = {
  Root: RadioGroupRootComponent,
  Label: RadioGroupLabelComponent,
  Item: RadioGroupItemComponent,
  ItemControl: RadioGroupItemControlComponent,
  ItemText: RadioGroupItemTextComponent,
  ItemHiddenInput: RadioGroupItemHiddenInputComponent,
}
