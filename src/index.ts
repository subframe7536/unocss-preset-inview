import { definePreset } from '@unocss/core'

export interface PresetInViewOptions {
  /**
   * Class prefix for matching inview rules.
   * @default 'inview:'
   */
  prefix?: string
}

export const presetInView = definePreset((options: PresetInViewOptions = {}) => {
  const { prefix = 'inview:' } = options
  const prefixWithNo = `no-${prefix}`
  return {
    name: 'unocss-preset-inview',
    // Customize your variants here
    variants: [
      {
        name: 'unocss-variant-inview',
        match: (matcher) => {
          if (!matcher.startsWith(prefix)) {
            return matcher
          }
          return {
            matcher: matcher.slice(prefix.length),
            selector: s => `${s}:not([no-inview])`,
          }
        },
      },
      {
        name: 'unocss-variant-no-inview',
        match: (matcher) => {
          if (!matcher.startsWith(prefixWithNo)) {
            return matcher
          }
          return {
            matcher: matcher.slice(prefixWithNo.length),
            selector: s => `${s}[no-inview]`,
          }
        },
      },
    ],
  }
})
