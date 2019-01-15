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
import { connect } from '../overmind'

const App = ({ overmind }) => (
  <button onClick={overmind.actions.toggleAwesomeApp}>
    Toggle awesome
  </button>
)

export default connect(App)
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
<button v-on:click="overmind.actions.toggleAwesomeApp()">
  Toggle awesome
</button>
    `,
    },
    {
      fileName: 'components/App.vue (script)',
      code: `
import { connect } from '../overmind'

export default connect({})
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
import { Connect, connect } from '../overmind'

const App: React.FunctionComponent<Connect> = ({ overmind }) => (
  <button onClick={overmind.actions.toggleAwesomeApp}>
    Toggle awesome
  </button>
)

export default connect(App)
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
