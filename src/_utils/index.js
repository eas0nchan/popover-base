export function isNumber(val) {
  return typeof val === 'number'
}

export function isString(val) {
  return typeof val === 'string'
}

export function isObject(val) {
  return typeof val === 'object' && !isNull(val)
}

export function isHTMLElement(val) {
  return val instanceof HTMLElement
}

export function isUndefined(val) {
  return val === undefined
}

export function isNull(val) {
  return val === null
}

export function isNil(val) {
  return isUndefined(val) || isNull(val)
}

export function isMounted(el) {
  return isHTMLElement(el) && document.body.contains(el)
}

export function querySelector(val) {
  return isMounted(val) ? val : isString(val) && val !== '' ? document.querySelector(val) : null
}

export const transformOriginMap = {
  top: 'bottom center',
  'top-start': 'bottom left',
  'top-end': 'bottom right',
  bottom: 'top center',
  'bottom-start': 'top left',
  'bottom-end': 'top right',
  left: 'right center',
  'left-start': 'right top',
  'left-end': 'right bottom',
  right: 'left center',
  'right-start': 'left top',
  'right-end': 'left bottom'
}

export const placementList = Object.keys(transformOriginMap)

export function placementValidator(val) {
  return placementList.includes(val)
}

export function on(target, event, callback, capture = false) {
  target.addEventListener(event, callback, capture)
  return () => off(target, event, callback, capture)
}

export function off(target, event, callback, capture = false) {
  target.removeEventListener(event, callback, capture)
}

export function createPointTrigger(x, y) {
  return {
    getBoundingClientRect() {
      return {
        width: 0,
        height: 0,
        x,
        y,
        top: y,
        left: x,
        right: x,
        bottom: y
      }
    }
  }
}
