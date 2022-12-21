import { computed, onUnmounted } from 'vue'
import { computePosition, autoUpdate, offset, flip, arrow } from '@floating-ui/dom'
import { isNil, isHTMLElement, placementList } from '../_utils'

export function useFloatingUi({
  triggerRef,
  virtualTriggerRef,
  bodyRef,
  bodyStyle,
  arrowRef,
  arrowStyle,
  offsetRef,
  initialPlacementRef,
  appliedPlacementRef
}) {
  const fallbackPlacements = computed(() => {
    const placement = initialPlacementRef.value

    const [staticSide, dynamicSide] = placement.split('-')
    const oppositeSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right'
    }[staticSide]
    const oppositePlacement = dynamicSide ? `${oppositeSide}-${dynamicSide}` : oppositeSide

    return placementList
      .filter(e => e !== placement)
      .sort((a, b) => {
        if (a === oppositePlacement) return -1
        else if (b === oppositePlacement) return 1
        a = a.split('-')[0]
        b = b.split('-')[0]
        if (a === staticSide && b === staticSide) return 0
        else if (a === staticSide && b !== staticSide) return -1
        else if (a !== staticSide && b === staticSide) return 1
        else if (a === oppositeSide && b === oppositeSide) return 0
        else if (a === oppositeSide && b !== oppositeSide) return -1
        else if (a !== oppositeSide && b === oppositeSide) return 1
        else return 0
      })
  })

  const middleware = computed(() => {
    const middleware = [
      offset(offsetRef.value),
      flip({ padding: 5, fallbackPlacements: fallbackPlacements.value })
    ]
    if (arrowRef.value) middleware.push(arrow({ element: arrowRef.value }))
    return middleware
  })

  function update() {
    const reference = triggerRef.value ?? virtualTriggerRef.value

    if (!reference || !isHTMLElement(bodyRef.value)) return

    computePosition(triggerRef.value, bodyRef.value, {
      placement: initialPlacementRef.value,
      middleware: middleware.value
    }).then(({ x, y, placement, middlewareData }) => {
      appliedPlacementRef.value = placement

      Object.assign(bodyStyle, { left: `${x}px`, top: `${y}px` })

      if (arrowRef.value && middlewareData.arrow) {
        const { x: arrowX, y: arrowY } = middlewareData.arrow

        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right'
        }[placement.split('-')[0]]

        Object.assign(arrowStyle, {
          left: isNil(arrowX) ? '' : `${arrowX}px`,
          top: isNil(arrowY) ? '' : `${arrowY}px`,
          right: '',
          bottom: '',
          [staticSide]: '-4px'
        })
      }
    })
  }

  let _cleanup
  function _autoUpdate() {
    if (isHTMLElement(triggerRef.value) && isHTMLElement(bodyRef.value)) {
      _cleanup = autoUpdate(triggerRef.value, bodyRef.value, update)
    } else if (virtualTriggerRef.value && isElement(bodyRef.value)) {
      update()
    }
  }
  function cleanup() {
    _cleanup?.()
    _cleanup = null
  }

  onUnmounted(cleanup)

  return { update, autoUpdate: _autoUpdate, cleanup }
}
