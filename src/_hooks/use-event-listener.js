import { onMounted, onUnmounted } from 'vue'
import { on, off } from '../_utils'

export function useEventListener(target, event, callback, capture = false) {
  onMounted(() => on(target, event, callback, capture))
  onUnmounted(() => off(target, event, callback, capture))
}
