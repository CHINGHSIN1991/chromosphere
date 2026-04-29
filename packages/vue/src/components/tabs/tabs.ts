import TabsRootComponent from './TabsRoot.vue'
import TabsListComponent from './TabsList.vue'
import TabsTriggerComponent from './TabsTrigger.vue'
import TabsContentComponent from './TabsContent.vue'

// Namespace 物件（讓使用者可以用 <Tabs.Root> 等語法）
export const Tabs = {
  Root: TabsRootComponent,
  List: TabsListComponent,
  Trigger: TabsTriggerComponent,
  Content: TabsContentComponent,
}
