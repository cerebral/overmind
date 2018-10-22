const javascript = {
  react: [
    {
      fileName: 'App.js',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../app'

const App = ({ app }) => {
  if (app.state.isLoading) {
    return <div>Loading app...</div>
  }

  return <h1>My awesome app</h1>
}

export default connect(App)
    `,
    },
  ],
  vue: [
    {
      fileName: 'components/App.vue (template)',
      target: 'markup',
      code: `
<div v-if="app.state.isLoading">
  Loading app...
</div>
<h1 v-else>My awesome app</h1>
    `,
    },
    {
      fileName: 'components/App.vue (script)',
      code: `
import { connect } from '../app'

export default connect({})
  `,
    },
  ],
}

const typescript = {
  react: [
    {
      fileName: 'components/App.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../app'

const App: React.SFC<Connect> = ({ app }) => {
  if (app.state.isLoading) {
    return <div>Loading app...</div>
  }

  return <h1>My awesome app</h1>
}

export default connect(App)
    `,
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'app.component.ts',
      code: `
import { Component } from '@angular/core';
import { connect } from '../app'

@Component({
  selector: 'app-root',
  template: \`
  <div *ngIf="app.state.isLoading">
    Loading app...
  </div>
  <h1 *ngIf="!app.state.isLoading">
    My awesome app
  </h1>
  \`
})
@connect()
export class App {}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
