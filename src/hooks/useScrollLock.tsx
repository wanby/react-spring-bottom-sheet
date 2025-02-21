import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from './body-scroll-lock'
import { useDebugValue, useEffect, useRef } from 'react'

/**
 * Handle scroll locking to ensure a good dragging experience on Android and iOS.
 *
 * On iOS the following may happen if scroll isn't locked:
 * - When dragging the sheet the background gets dragged at the same time.
 * - When dragging the page scroll is also affected, causing the drag to feel buggy and "slow".
 *
 * On Android it causes the chrome toolbar to pop down as you drag down, and hide as you drag up.
 * When it's in between two toolbar states it causes the framerate to drop way below 60fps on
 * the bottom sheet drag interaction.
 */
export function useScrollLock({
  targetRef,
  enabled,
  reserveScrollBarGap,
  ignoreLockClasses,
}: {
  targetRef: React.RefObject<Element>
  enabled: boolean
  reserveScrollBarGap: boolean,
  ignoreLockClasses: string[],
}) {
  const ref = useRef<{ activate: () => void; deactivate: () => void }>({
    activate: () => {
      throw new TypeError('Tried to activate scroll lock too early')
    },
    deactivate: () => {},
  })

  useDebugValue(enabled ? 'Enabled' : 'Disabled')

  useEffect(() => {
    if (!enabled) {
      ref.current.deactivate()
      ref.current = { activate: () => {}, deactivate: () => {} }
      return
    }

    const target = targetRef.current
    let active = false

    ref.current = {
      activate: () => {
        if (active) return
        active = true
        clearAllBodyScrollLocks();
        disableBodyScroll(target, {
          allowTouchMove: (el) => {
            // el.closest('[data-body-scroll-lock-ignore]')
            if (ignoreLockClasses.length === 0) return false;
            return ignoreLockClasses.some((className) => {
              return className && className.length && el.closest(`.${className}`)
            })
          },
          reserveScrollBarGap,
        })
      },
      deactivate: () => {
        if (!active) return
        active = false
        enableBodyScroll(target)
      },
    }
  }, [enabled, targetRef, reserveScrollBarGap, ignoreLockClasses])

  return ref
}
