import { isString, isHTMLElement, placementValidator } from '../_utils'

export let visibleCount = 0
export function setVisibleCount(setter) {
  visibleCount = setter(visibleCount)
}

export const popoverBaseProps = {
  show: {
    type: Boolean,
    default: false
  },
  x: Number,
  y: Number,
  trigger: {
    validator: val => ['hover', 'click', 'focus', 'manual'].includes(val),
    default: 'hover'
  },
  placement: {
    validator: placementValidator,
    default: 'top'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  offset: {
    type: Number,
    default: 10
  },
  showDelay: {
    type: Number,
    default: 100
  },
  hideDelay: {
    type: Number,
    default: 200
  },
  arrow: {
    type: Boolean,
    default: true
  },
  zIndex: {
    type: Number,
    default: 2000
  },
  to: {
    validator: val => isString(val) || isHTMLElement(val) || val === false,
    default: 'body'
  },
  transitionName: {
    type: String,
    default: 'v-popover-base-transition'
  },
  clickOutsideEvent: {
    validator: val => ['click', 'mousedown'].includes(val),
    default: 'click'
  },
  backgroundColor: {
    type: String,
    default: '#fff'
  }
}
