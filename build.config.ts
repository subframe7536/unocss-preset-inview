import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/runtime',
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
