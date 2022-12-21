<script>
export default {
  name: 'PopoverBase',
  inheritAttrs: false
}
</script>

<script setup>
import { ref, toRef, reactive, computed, watch, nextTick } from 'vue'
import Teleport from 'vue2-teleport-component'
import { useFloatingUi, useIsMounted, useEventListener, useTrigger } from '../_hooks'
import { popoverBaseProps, visibleCount, setVisibleCount } from './config'
import { isNil, querySelector, transformOriginMap, createPointTrigger } from '../_utils'

const props = defineProps(popoverBaseProps)

const emit = defineEmits(['click-outside', 'after-show', 'after-hide'])

const isMounted = useIsMounted()

const _show = ref(false)
const _to = computed(() => querySelector(props.to))
const _placement = ref(props.placement)

const visible = computed(() => {
  return (
    !props.disabled && isMounted.value && (props.trigger === 'manual' ? props.show : _show.value)
  )
})
watch(visible, val => setVisibleCount(count => (val ? ++count : --count)))

const wrapRef = ref(null)
const triggerRef = computed(() => wrapRef.value?.firstElementChild)
const triggerWidth = computed(() => triggerRef.value?.offsetWidth)
const virtualTriggerRef = computed(() => {
  return props.trigger === 'manual' && !isNil(props.x) && !isNil(props.y)
    ? createPointTrigger(props.x, props.y)
    : null
})
const bodyRef = ref(null)
const arrowRef = ref(null)

const bodyStyle = reactive({
  left: '',
  top: '',
  zIndex: computed(() => (visible.value ? props.zIndex + visibleCount - 1 : props.zIndex)),
  backgroundColor: computed(() => props.backgroundColor),
  transformOrigin: computed(() => transformOriginMap[_placement.value])
})

const arrowStyle = reactive({
  left: '',
  top: '',
  right: '',
  bottom: ''
})

const { update, autoUpdate, cleanup } = useFloatingUi({
  triggerRef,
  virtualTriggerRef,
  bodyRef,
  bodyStyle,
  arrowRef,
  arrowStyle,
  offsetRef: toRef(props, 'offset'),
  initialPlacementRef: toRef(props, 'placement'),
  appliedPlacementRef: _placement
})

watch(virtualTriggerRef, val => val && visible.value && update())

function handleBeforeEnter() {
  nextTick(autoUpdate)
}
function handleAfterEnter() {
  emit('after-show')
}
function handleAfterLeave() {
  cleanup()
  Object.assign(bodyStyle, { left: '', top: '' })
  emit('after-hide')
}

useEventListener(
  document,
  props.clickOutsideEvent,
  ({ target }) => {
    if (wrapRef.value?.contains(target) || bodyRef.value?.contains(target)) return
    emit('click-outside')
    if (props.trigger === 'click') _show.value = false
  },
  true
)

const { handleMouseEnter, handleMouseLeave } = useTrigger({
  triggerRef,
  triggerNameRef: toRef(props, 'trigger'),
  showRef: _show,
  showDelayRef: toRef(props, 'showDelay'),
  hideDelayRef: toRef(props, 'hideDelay')
})

function setVisible(val) {
  _show.value = !!val
}

defineExpose({ setVisible, updatePosition: update })
</script>

<template>
  <div ref="wrapRef" class="v-popover-base__wrap">
    <slot name="trigger"></slot>
    <Teleport :to="_to">
      <Transition
        :name="transitionName"
        @before-enter="handleBeforeEnter"
        @after-enter="handleAfterEnter"
        @after-leave="handleAfterLeave"
      >
        <div
          v-if="visible && $scopedSlots.default"
          ref="bodyRef"
          class="v-popover-base__body"
          :style="bodyStyle"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <div class="v-popover-base__content"><slot :trigger-width="triggerWidth"></slot></div>
          <div
            v-if="arrow && $scopedSlots.default"
            ref="arrowRef"
            class="v-popover-base__arrow"
            :style="arrowStyle"
          ></div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
.v-popover-base-transition-enter-active {
  transition: opacity 0.15s cubic-bezier(0, 0, 0.2, 1), transform 0.15s cubic-bezier(0, 0, 0.2, 1);
}

.v-popover-base-transition-leave-active {
  transition: opacity 0.15s cubic-bezier(0.4, 0, 1, 1), transform 0.15s cubic-bezier(0.4, 0, 1, 1);
}

.v-popover-base-transition-enter,
.v-popover-base-transition-leave-to {
  opacity: 0;
  transform: scale(0.85);
}

.v-popover-base__wrap {
  display: inline-block;
}

.v-popover-base__body {
  position: absolute;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
}

.v-popover-base__content {
  border-radius: inherit;
  background-color: inherit;
}

.v-popover-base__arrow {
  position: absolute;
  z-index: -1;
  width: 8px;
  height: 8px;
  background-color: inherit;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.12);
  transform: rotate(45deg);
}
</style>
