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
  return {
    name: 'unocss-preset-inview',
    // Customize your variants here
    variants: [
      {
        name: 'unocss-preset-inview',
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
    ],
  }
})
