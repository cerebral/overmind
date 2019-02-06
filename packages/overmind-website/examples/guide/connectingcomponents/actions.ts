const javascript = {
  react: [
    {
      fileName: 'overmind/actions.js',
      code: `
export const toggleAwesomeApp = ({ state }) =>
  state.isAwesome = !state.isAwesome
    `,
    },
    {
      fileName: 'components/App.js',
      target: 'jsx',
      code: `
import React from 'react'
import { useOvermind } from '../overmind'

const App = () => {
  const { actions } = useOvermind()

  return (
    <button onClick={actions.toggleAwesomeApp}>
      Toggle awesome
    </button>
  )
}

export default App
    `,
    },
  ],
  vue: [
    {
      fileName: 'overmind/actions.js',
      code: `
export const toggleAwesomeApp = ({ state }) =>
  state.isAwesome = !state.isAwesome
    `,
    },
    {
      fileName: 'components/App.vue (template)',
      target: 'markup',
      code: `
<button @click="actions.toggleAwesomeApp()">
  Toggle awesome
</button>
    `,
    },
  ],
}

const typescript = {
  react: [
    {
      fileName: 'overmind/actions.ts',
      code: `
import { Action } from 'overmind'

export const toggleAwesomeApp: Action = ({ state }) =>
  state.isAwesome = !state.isAwesome
    `,
    },
    {
      fileName: 'components/App.tsx',
      code: `
import * as React from 'react'
import { useOvermind } from '../overmind'

const App: React.FunctionComponent = () => {
  const { actions } = useOvermind()

  return (
    <button onClick={actions.toggleAwesomeApp}>
      Toggle awesome
    </button>
  )
}

export default App
    `,
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'overmind/actions.ts',
      code: `
import { Action } from 'overmind'

export const toggleAwesomeApp: Action = ({ state }) =>
  state.isAwesome = !state.isAwesome
    `,
    },
    {
      fileName: 'components/app.component.ts',
      code: `
import { Component } from '@angular/core';
import { connect } from '../overmind'

@Component({
  selector: 'app-root',
  template: \`
  <button (click)="overmind.actions.toggleAwesomeApp()">
    Toggle awesome
  </button>
  \`
})
@connect()
export class App {}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
