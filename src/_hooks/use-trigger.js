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

  watch(triggerRef, trigger => {
    offList.forEach(off => off())
    if (!isHTMLElement(trigger)) return (offList = [])
    offList = [
      on(trigger, 'mouseenter', handleMouseEnter),
      on(trigger, 'mouseleave', handleMouseLeave),
      on(trigger, 'click', () => {
        if (triggerNameRef.value === 'click') showRef.value = !showRef.value
      }),
      on(trigger, 'focus', () => {
        if (triggerNameRef.value === 'focus') showRef.value = true
      }),
      on(trigger, 'blur', () => {
        if (triggerNameRef.value === 'focus') showRef.value = false
      })
    ]
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
