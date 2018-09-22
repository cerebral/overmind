const javascript = {
  react: [
    {
      fileName: 'app/actions.js',
      code: `
import * as mutations from './mutations'

export const toggleAwesomeApp = action =>
  action
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
  ],
  vue: [
    {
      fileName: 'app/actions.js',
      code: `
import * as mutations from './mutations'

export const toggleAwesomeApp: Action = action =>
  action
    .mutate(mutations.toggleAwesomeApp)
    `,
    },
    {
      fileName: 'components/App.vue (template)',
      target: 'markup',
      code: `
<button v-on:click="app.actions.toggleAwesomeApp()">
  Toggle awesome
</button>
    `,
    },
    {
      fileName: 'components/App.vue (script)',
      code: `
import app from './app'

export default app.connect({})
  `,
    },
  ],
}

const typescript = {
  react: [
    {
      fileName: 'app/actions.ts',
      code: `
import * as mutations from './mutations'

export const toggleAwesomeApp: Action = action =>
  action
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
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'app/actions.ts',
      code: `
import * as mutations from './mutations'

export const toggleAwesomeApp: Action = action =>
  action
    .mutate(mutations.toggleAwesomeApp)
    `,
    },
    {
      fileName: 'components/app.component.ts',
      code: `
import { Component } from '@angular/core';
import app from '../app'

@Component({
  selector: 'app-root',
  template: \`
  <button (click)="app.actions.toggleAwesomeApp()">
    Toggle awesome
  </button>
  \`
})
@app.connect()
export class App {}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
