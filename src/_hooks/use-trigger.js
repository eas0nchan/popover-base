import { watch, onUnmounted } from 'vue'
import { isHTMLElement, on } from '../_utils'

export function useTrigger({ triggerRef, triggerNameRef, showRef, showDelayRef, hideDelayRef }) {
  let offList = []

  let timer
  function handleMouseEnter() {
    if (triggerNameRef.value === 'hover') {
      clearTimeout(timer)
      timer = setTimeout(() => (showRef.value = true), showDelayRef.value)
    }
  }
  function handleMouseLeave() {
    if (triggerNameRef.value === 'hover') {
      clearTimeout(timer)
      timer = setTimeout(() => (showRef.value = false), hideDelayRef.value)
    }
  }

  watch([triggerRef, triggerNameRef], ([trigger, triggerName]) => {
    offList.forEach(off => off())
    if (!isHTMLElement(trigger) || triggerName === 'manual') return (offList = [])
    if (triggerName === 'hover') {
      offList = [
        on(trigger, 'mouseenter', handleMouseEnter),
        on(trigger, 'mouseleave', handleMouseLeave)
      ]
    } else if (triggerName === 'click') {
      offList = [on(trigger, 'click', () => (showRef.value = !showRef.value))]
    } else if (triggerName === 'focus') {
      offList = [
        on(trigger, 'focus', () => (showRef.value = true)),
        on(trigger, 'blur', () => (showRef.value = false))
      ]
    }
  })

  onUnmounted(() => {
    clearTimeout(timer)
    offList.forEach(off => off())
  })

  return {
    handleMouseEnter,
    handleMouseLeave
  }
}
