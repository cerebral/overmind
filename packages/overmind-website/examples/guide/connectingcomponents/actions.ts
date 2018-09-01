export const react = [
  {
    fileName: 'app/actions.js',
    code: `
import * as mutations from './mutations'

export const toggleAwesomeApp = action =>
    action()
      .mutate(mutations.toggleAwesomeApp)
  `,
  },
  {
    fileName: 'components/App.js',
    target: 'jsx',
    code: `
import React from 'react'
import app from './app'

const App = ({ app }) => (
  <button onClick={() => app.actions.toggleAwesomeApp()}>
    Toggle awesome
  </button>
)

export default app.connect(App)
  `,
  },
]

export const reactTs = [
  {
    fileName: 'app/actions.ts',
    code: `
import * as mutations from './mutations'

export const toggleAwesomeApp: Action = action =>
    action()
      .mutate(mutations.toggleAwesomeApp)
  `,
  },
  {
    fileName: 'components/App.tsx',
    code: `
import * as React from 'react'
import app, { Connect } from './app'

const App: React.SFC<Connect> = ({ app }) => (
  <button onClick={() => app.actions.toggleAwesomeApp()}>
    Toggle awesome
  </button>
)

export default app.connect(App)
  `,
  },
]

export const vue = [
  {
    fileName: 'app/actions.js',
    code: `
import * as mutations from './mutations'

export const toggleAwesomeApp: Action = action =>
    action()
      .mutate(mutations.toggleAwesomeApp)
  `,
  },
  {
    fileName: 'components/List.vue (template)',
    target: 'markup',
    code: `
<h1>{{app.state.myObject}}</h1>
  `,
  },
  {
    fileName: 'components/List.vue (script)',
    code: `
import app from './app'

export default app.connect({})
`,
  },
]

export const vueTs = vue
