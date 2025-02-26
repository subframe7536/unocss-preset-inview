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

export function initObserver(
  callback: IntersectionObserverCallback | undefined,
  once: boolean | ((target: HTMLElement) => boolean),
  threshold: number,
): IntersectionObserver {
  return new IntersectionObserver(
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

export function bindObserver(
  observer: IntersectionObserver,
  selector: string | HTMLElement[],
): void {
  const elements = typeof selector === 'string'
    ? Array.from(document.querySelectorAll(selector))
    : selector
  for (const element of elements) {
    element.setAttribute('no-inview', '')
    observer.observe(element)
  }
}

export function clearObserver(observer: IntersectionObserver): void {
  for (const entry of observer.takeRecords() || []) {
    observer.unobserve(entry.target)
  }
  observer.disconnect()
}

/**
 * JS runtime for `inview-` class,
 * use {@link https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver IntersectionObserver} under the hood
 * @param options {@link UseInViewOptions}
 * @example
 * ```ts
 * const [start, stop] = useInView(options)
 * // check `document` exists and start observe the elements
 * // support custom CSS selector or html elements, default is '[class*="inview"]'
 * start()
 * // unobserve all elements and disconnect the observer
 * stop()
 * ```
 */
export function useInView(
  options: UseInViewOptions = {},
): [start: (cssSelector?: string | HTMLElement[]) => void, stop: VoidFunction] {
  const { callback, once = true, threshold = 0.1 } = options
  let observer: IntersectionObserver | undefined

  return [
    (selector = '[class*="inview"]') => {
      if (typeof document !== 'undefined') {
        if (!observer) {
          observer = initObserver(callback, once, threshold)
        }
        bindObserver(observer, selector)
      } else {
        console.warn('document is undefined, skip binding IntersectionObserver')
      }
    },
    () => observer && clearObserver(observer),
  ]
}
