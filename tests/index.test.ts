import { createGenerator, presetUno } from 'unocss'
import { expect, it } from 'vitest'
import { presetInView } from '../src'

it('presetInView', async () => {
  const uno = await createGenerator({
    presets: [presetUno({ preflight: 'on-demand' }), presetInView()],
  })

  const { css } = await uno.generate('translate-y-30 inview:translate-y-0 no-inview:scroll-mt-24')

  expect(css).toMatchInlineSnapshot(`
    "/* layer: preflights */
    *,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;}
    /* layer: default */
    .inview\\:translate-y-0:not([no-inview]){--un-translate-y:0;transform:translateX(var(--un-translate-x)) translateY(var(--un-translate-y)) translateZ(var(--un-translate-z)) rotate(var(--un-rotate)) rotateX(var(--un-rotate-x)) rotateY(var(--un-rotate-y)) rotateZ(var(--un-rotate-z)) skewX(var(--un-skew-x)) skewY(var(--un-skew-y)) scaleX(var(--un-scale-x)) scaleY(var(--un-scale-y)) scaleZ(var(--un-scale-z));}
    .translate-y-30{--un-translate-y:7.5rem;transform:translateX(var(--un-translate-x)) translateY(var(--un-translate-y)) translateZ(var(--un-translate-z)) rotate(var(--un-rotate)) rotateX(var(--un-rotate-x)) rotateY(var(--un-rotate-y)) rotateZ(var(--un-rotate-z)) skewX(var(--un-skew-x)) skewY(var(--un-skew-y)) scaleX(var(--un-scale-x)) scaleY(var(--un-scale-y)) scaleZ(var(--un-scale-z));}
    .no-inview\\:scroll-mt-24[no-inview]{scroll-margin-top:6rem;}"
  `)
})
