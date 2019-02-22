export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/index.ts',
          code: `
import { createOvermind, IConfig } from 'overmind'
import { createHook } from 'overmind-react'
import { state } from './state'
import * as actions from './actions'

const config = {
  state,
  actions
}

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

const overmind = createOvermind(config)

export const useOvermind = createHook(overmind)
  `,
        },
        {
          fileName: 'components/App.tsx',
          code: `
import * as React from 'react'
import { useOvermind } from '../overmind'

const App: React.FunctionComponent = () => {
  const { state, actions, effects, addMutationListener } = useOvermind()

  return <div />
}

export default App
`,
        },
      ]
    : [
        {
          fileName: 'overmind/index.js',
          code: `
import { createOvermind } from 'overmind'
import { createHook } from 'overmind-react'

const overmind = createOvermind({
  state: {},
  actions: {}
})

export const useOvermind = createHook(overmind)
`,
        },
        {
          fileName: 'components/App.jsx',
          code: `
import React from 'react'
import { useOvermind } from '../overmind'

const App = () => {
  const { state, actions, effects, addMutationListener } = useOvermind()

  return <div />
}

export default App
`,
        },
      ]
