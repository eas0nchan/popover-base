import PopoverBase from './popover/PopoverBase.vue'
import { popoverBaseProps } from './popover/config'

PopoverBase.install = Vue => Vue.component(PopoverBase.name, PopoverBase)

export { PopoverBase, popoverBaseProps }

export default PopoverBase
