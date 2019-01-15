export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/index.ts',
          code: `
import { Overmind, IConfig } from 'overmind'
import { createConnect, IConnect } from 'overmind-react'
import { state } from './state'
import * as actions from './actions'

const config = {
  state,
  actions
}

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export interface Connect extends IConnect<typeof config> {}

const overmind = new Overmind(config)

export const connect = createConnect(overmind)
  `,
        },
        {
          fileName: 'components/App.tsx',
          code: `
import * as React from 'react'
import { connect, Connect } from '../overmind'

type Props = {} & Connect

const App: React.FunctionComponent<Props> = ({ overmind }) => {
  const { state, actions, effects, addMutationListener } = overmind

  return <div />
}

export default connect(App)
`,
        },
      ]
    : [
        {
          fileName: 'overmind/index.jsx',
          code: `
import { Overmind } from 'overmind'
import { createConnect } from 'overmind-react'

const overmind = new Overmind({
  state: {},
  actions: {}
})

export const connect = createConnect(overmind)
`,
        },
        {
          fileName: 'components/App.jsx',
          code: `
import React from 'react'
import { connect } from '../overmind'

const App = ({ overmind }) => {
  const { state, actions, effects, addMutationListener } = overmind

  return <div />
}

export default connect(App)
`,
        },
      ]
