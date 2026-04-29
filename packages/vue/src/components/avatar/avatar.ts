import AvatarRootComponent from './AvatarRoot.vue'
import AvatarImageComponent from './AvatarImage.vue'
import AvatarFallbackComponent from './AvatarFallback.vue'

// Namespace 物件（讓使用者可以用 <Avatar.Root> 等語法）
export const Avatar = {
  Root: AvatarRootComponent,
  Image: AvatarImageComponent,
  Fallback: AvatarFallbackComponent,
}
