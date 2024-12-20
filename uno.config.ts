import { defineConfig, presetUno } from 'unocss'
import { presetInView } from './src'

// Just for Vscode Extension

export default defineConfig({
  presets: [
    presetUno(),
    presetInView(),
  ],
})
