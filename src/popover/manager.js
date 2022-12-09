import { isNumber } from '../_utils'

export let baseZIndex = 2000
export function setBaseZIndex(zIndex) {
  isNumber(zIndex) && (baseZIndex = zIndex)
}

export let visibleCount = 0
export function setVisibleCount(setter) {
  visibleCount = setter(visibleCount)
}
