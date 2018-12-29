export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/index.ts',
          code: `
import { Overmind, TConfig } from 'overmind'
import { createHook } from 'overmind-react'
import { state } from './state'
import * as actions from './actions'

const config = {
  state,
  actions
}

declare module 'overmind' {
  interface IConfig extends TConfig<typeof config> {}
}

const app = new Overmind(config)

export const useOvermind = createHook(app)
  `,
        },
        {
          fileName: 'components/App.tsx',
          code: `
import * as React from 'react'
import { useOvermind } from '../app'

const App: React.SFC = () => {
  const { state, actions } = useOvermind()

  return <div />
}

export default App
`,
        },
      ]
    : [
        {
          fileName: 'app/index.js',
          code: `
import { Overmind } from 'overmind'
import { createHook } from 'overmind-react'

const app = new Overmind({
  state: {},
  actions: {}
})

export const useOvermind = createHook(app)
`,
        },
        {
          fileName: 'components/App.jsx',
          code: `
import React from 'react'
import { useOvermind } from '../app'

const App = () => {
  const { state, actions } = useOvermind()

  return <div />
}

export default App
`,
        },
      ]
