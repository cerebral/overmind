import { tsAppIndex } from '../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/onInitialize.ts',
          code: `
import { OnInitialize } from 'overmind'

const onInitialize: OnInitialize = async ({ state, effects }, overmind) => {
  overmind.addFlushListener(effects.history.addMutations)
}

export default onInitialize
`,
        },
      ]
    : [
        {
          fileName: 'overmind/onInitialize.js',
          code: `
const onInitialize = async ({ state, effects }, overmind) => {
  overmind.addFlushListener(effects.history.addMutations)
}

export default onInitialize
`,
        },
      ]
