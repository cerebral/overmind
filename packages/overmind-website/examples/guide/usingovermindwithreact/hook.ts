export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/index.ts',
          code: `
import { IConfig } from 'overmind'
import { createHook } from 'overmind-react'
import { state } from './state'
import * as actions from './actions'

export const config = {
  state,
  actions
}

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const useOvermind = createHook<typeof config>()
  `,
        },
        {
          fileName: 'index.tsx',
          code: `
import * as React from 'react'
import { render } from 'react-dom'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from './overmind'
import App from './components/App'

const overmind = createOvermind(config)

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
import { createHook } from 'overmind-react'          
          
export const config = {
  state: {},
  actions: {}
}

export const useOvermind = createHook()
`,
        },
        {
          fileName: 'index.js',
          code: `
import React from 'react'
import { render } from 'react-dom'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from './overmind'
import App from './components/App'

const overmind = createOvermind(config)

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
import { useOvermind } from '../overmind'

const App = () => {
  const { state, actions, effects, addMutationListener } = useOvermind()

  return <div />
}

export default App
`,
        },
      ]
