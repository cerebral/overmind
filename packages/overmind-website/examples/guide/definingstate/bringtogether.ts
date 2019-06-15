export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/index.ts',
          code: `
import { state } from './state'

export const config = {
  state
}

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}
  `,
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
          fileName: 'overmind/index.js',
          code: `
import { state } from './state'

export const config = {
  state
}
`,
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
