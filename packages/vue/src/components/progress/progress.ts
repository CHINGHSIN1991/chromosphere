import ProgressRootComponent from './ProgressRoot.vue'
import ProgressLabelComponent from './ProgressLabel.vue'
import ProgressTrackComponent from './ProgressTrack.vue'
import ProgressRangeComponent from './ProgressRange.vue'
import ProgressValueTextComponent from './ProgressValueText.vue'

// Namespace 物件（讓使用者可以用 <Progress.Root> 等語法）
export const Progress = {
  Root: ProgressRootComponent,
  Label: ProgressLabelComponent,
  Track: ProgressTrackComponent,
  Range: ProgressRangeComponent,
  ValueText: ProgressValueTextComponent,
}
