export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/index.ts',
          code: `
import { IConfig } from 'overmind'
import { createConnect } from 'overmind-react'
import { state } from './state'
import * as actions from './actions'

export const config = {
  state,
  actions
}

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export interface Connect extends IConnect<typeof config> {}

export const connect = createConnect()
  `,
        },
        {
          fileName: 'components/index.tsx',
          code: `
import * as React from 'react'
import { render } from 'react-dom'
import { Overmind } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from './overmind'
import App from './components/App'

const overmind = new Overmind(config)

render((
  <Provider value={overmind}>
    <App />
  </Provider>
), document.querySelector('#app'))
`,
        },
        {
          fileName: 'components/App.tsx',
          code: `
import * as React from 'react'
import { connect } from '../overmind'

const App: React.FunctionComponent = ({ overmind }) => {
  return <div />
}

export default connect(App)
`,
        },
      ]
    : [
        {
          fileName: 'overmind/index.js',
          code: `
import { Overmind } from 'overmind'
import { createConnect } from 'overmind-react'

export const config = {
  state: {},
  actions: {}
}

export const connect = createConnect()
`,
        },
        {
          fileName: 'components/index.tsx',
          code: `
import React from 'react'
import { render } from 'react-dom'
import { Overmind } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from './overmind'
import App from './components/App'

const overmind = new Overmind(config)

render((
  <Provider value={overmind}>
    <App />
  </Provider>
), document.querySelector('#app'))
`,
        },
        {
          fileName: 'components/App.jsx',
          code: `
import React from 'react'
import { connect } from '../overmind'

const App = ({ overmind }) => {
  return <div />
}

export default connect(App)
`,
        },
      ]
