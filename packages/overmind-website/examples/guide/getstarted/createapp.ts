import { tsAppIndex, tsSimpleAppIndex } from '../../templates'

export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/state.ts',
          code: `
type State = {
  count: number
}

export const state: State = {
  count: 0
}
`,
        },
        {
          fileName: 'overmind/index.ts',
          code: tsSimpleAppIndex(
            `
import { state } from './state'

export const config = {
  state,
}
`
          ),
        },
        {
          fileName: 'index.ts',
          code: `
import { createOvermind } from 'overmind'
import { config } from './overmind'

const overmind = createOvermind(config)
`,
        },
      ]
    : [
        {
          fileName: 'overmind/state.js',
          code: `
export const state = {
  count: 0
}
`,
        },
        {
          fileName: 'overmind/index.js',
          code: `
import { state } from './state'

export const config = {
  state
}
`,
        },
        {
          fileName: 'index.js',
          code: `
import { createOvermind } from 'overmind'
import { config } from './overmind'

const overmind = createOvermind(config)
`,
        },
      ]
