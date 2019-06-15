import { tsSimpleAppIndex } from '../../templates'

export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/state.ts',
          code: `
type State = {
  title: string
}

export const state: State = {
  title: 'My App'
}
`,
        },
        {
          fileName: 'overmind/index.ts',
          code: tsSimpleAppIndex(`
import { state } from './state'

export const config = {
  state
}
`),
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
  title: 'My App'
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
