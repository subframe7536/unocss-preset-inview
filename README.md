# unocss-preset-inview [![npm](https://img.shields.io/npm/v/unocss-preset-inview)](https://npmjs.com/package/unocss-preset-inview)

UnoCSS preset for scroll inview animation.

## Install

```shell
npm i -D unocss-preset-inview unocss
```

```shell
yarn add -D unocss-preset-inview unocss
```

```shell
pnpm add -D unocss-preset-inview unocss
```

## Usage

The preset need some js runtime for trigger inview events, it use [IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver) under the hood.

in your component root (`solid-js` as example, but it is framework agnostic)

```tsx
import { onCleanup, onMount } from 'solid-js'
import { useInView } from 'unocss-preset-inview/runtime'

export default function Home() {
  const [start, stop] = useInView()
  onMount(() => start())
  onCleanup(stop)
  return (
    <div class="translate-y-30 op-0 transition-(250 ease-out) inview:(translate-y-0 op-100)">
      test
    </div>
  )
}
```

in `uno.config.ts`

```ts
import { defineConfig } from 'unocss'
import { presetInView } from 'unocss-preset-inview'

export default defineConfig({
  presets: [
    // ...
    presetInView(),
  ],
})
```

## Types

```ts
export interface PresetInViewOptions {
  /**
   * Class prefix for matching inview rules.
   * @default 'inview:'
   */
  prefix?: string
}

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
```

## License

MIT
