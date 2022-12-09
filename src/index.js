import { setBaseZIndex } from './popover/manager'
import VfPopoverBase from './popover/PopoverBase.vue'

export { VfPopoverBase }

export default (Vue, { zIndex = 2000 } = {}) => {
  setBaseZIndex(zIndex)
  Vue.component('VfPopoverBase', VfPopoverBase)
}
 