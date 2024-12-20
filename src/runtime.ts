/**
 * Options for {@link useInView}
 */
export interface UseInViewOptions {
  /**
   * Only trigger once
   * @default true
   */
  once?: boolean | ((target: HTMLElement) => boolean)
  /**
   * Callback function
   */
  callback?: IntersectionObserverCallback
  /**
   * Trigger threshold, 0 ~ 1
   * @default 0.1
   */
  threshold?: number
}

/**
 * JS runtime for `inview-` class,
 * use {@link https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver IntersectionObserver} under the hood
 * @param options {@link UseInViewOptions}
 * @example
 * const [start, stop] = useInView(options)
 * // check `document` exists and start observe the elements
 * // default selector is '[class*="inview"]'
 * start('custom-css-selector')
 * // unobserve all elements and disconnect the observer
 * stop()
 */
export function useInView(
  options: UseInViewOptions = {},
): [start: (cssSelector?: string) => void, stop: VoidFunction] {
  const { callback, once = true, threshold = 0.1 } = options
  let observer: IntersectionObserver | undefined
  function initObserver(): void {
    if (observer) {
      return
    }
    observer = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          requestAnimationFrame(() => {
            const target = entry.target as HTMLElement
            if (entry.isIntersecting) {
              target.removeAttribute('no-inview')
              if (typeof once === 'function' ? once(target) : once) {
                observer.unobserve(target)
              }
            } else {
              target.setAttribute('no-inview', '')
            }
          })
        }
        callback?.(entries, observer)
      },
      { threshold },
    )
  }

  return [
    (selector = '[class*="inview"]') => {
      if (typeof document !== 'undefined') {
        const elements = Array.from(document.querySelectorAll(selector))
        initObserver()
        for (const element of elements) {
          element.setAttribute('no-inview', '')
          observer!.observe(element)
        }
      }
    },
    () => {
      if (observer) {
        for (const entry of observer.takeRecords() || []) {
          observer.unobserve(entry.target)
        }
        observer.disconnect()
      }
    },
  ]
}
