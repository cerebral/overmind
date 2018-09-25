import { tsAppIndex } from '../../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'app/state.ts',
          code: `
export let isLoadingPosts: boolean = false
    `,
        },
        {
          fileName: 'app/index.ts',
          code: tsAppIndex(
            view,
            `
import * as state from './state'

const config = {
  state,
}
`
          ),
        },
      ]
    : [
        {
          fileName: 'app/state.js',
          code: `
export let isLoadingPosts = false
    `,
        },
        {
          fileName: 'app/index.js',
          code: `
import App from 'overmind'
import createConnect from 'overmind-${view}'
import * as state from './state'

const app = new App({
  state
})

export const connect = createConnect(app)

export default app
    `,
        },
      ]
