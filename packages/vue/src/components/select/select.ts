import SelectRootComponent from './SelectRoot.vue'
import SelectLabelComponent from './SelectLabel.vue'
import SelectTriggerComponent from './SelectTrigger.vue'
import SelectValueTextComponent from './SelectValueText.vue'
import SelectIndicatorComponent from './SelectIndicator.vue'
import SelectPositionerComponent from './SelectPositioner.vue'
import SelectContentComponent from './SelectContent.vue'
import SelectItemComponent from './SelectItem.vue'
import SelectItemTextComponent from './SelectItemText.vue'
import SelectItemIndicatorComponent from './SelectItemIndicator.vue'
import SelectItemGroupComponent from './SelectItemGroup.vue'
import SelectItemGroupLabelComponent from './SelectItemGroupLabel.vue'

// Namespace 物件（讓使用者可以用 <Select.Root> 等語法）
export const Select = {
  Root: SelectRootComponent,
  Label: SelectLabelComponent,
  Trigger: SelectTriggerComponent,
  ValueText: SelectValueTextComponent,
  Indicator: SelectIndicatorComponent,
  Positioner: SelectPositionerComponent,
  Content: SelectContentComponent,
  Item: SelectItemComponent,
  ItemText: SelectItemTextComponent,
  ItemIndicator: SelectItemIndicatorComponent,
  ItemGroup: SelectItemGroupComponent,
  ItemGroupLabel: SelectItemGroupLabelComponent,
}
