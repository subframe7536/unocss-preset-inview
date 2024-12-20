import { definePreset } from '@unocss/core'

export const presetInView = definePreset(() => {
  return {
    name: 'unocss-preset-inview',
    // Customize your variants here
    variants: [
      {
        name: 'inview',
        match: (matcher) => {
          if (!matcher.startsWith('inview-') && !matcher.startsWith('inview:')) {
            return matcher
          }
          return {
            matcher: matcher.slice(7),
            selector: s => `${s}:not([no-inview])`,
          }
        },
      },
    ],
  }
})
