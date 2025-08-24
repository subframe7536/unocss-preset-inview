import { defineConfig, presetWind3 } from 'unocss'

import { presetInView } from './src'

// Just for Vscode Extension

export default defineConfig({
  presets: [
    presetWind3(),
    presetInView(),
  ],
})
