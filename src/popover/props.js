import { baseZIndex } from './manager'
import { isString, isHTMLElement, isNil, placementValidator } from '../_utils'

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
    default: 'bottom'
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
    default: baseZIndex
  },
  to: {
    validator: val => isString(val) || isHTMLElement(val) || isNil(val),
    default: 'body'
  },
  transitionName: {
    type: String,
    default: 'vf-popover-base-transition'
  },
  clickOutsideEvent: {
    validator: val => ['click', 'mousedown'].includes(val),
    default: 'click'
  }
}
