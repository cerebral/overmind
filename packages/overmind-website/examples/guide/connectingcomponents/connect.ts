const javascript = {
  react: [
    {
      fileName: 'App.js',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../overmind'

const App = ({ overmind }) => {
  if (overmind.state.isLoading) {
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
<div v-if="overmind.state.isLoading">
  Loading app...
</div>
<h1 v-else>My awesome app</h1>
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
      fileName: 'components/App.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../../overmind'

const App: React.FunctionComponent<Connect> = ({ overmind }) => {
  if (overmind.state.isLoading) {
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
import { connect } from '../overmind'

@Component({
  selector: 'app-root',
  template: \`
  <div *ngIf="overmind.state.isLoading">
    Loading app...
  </div>
  <h1 *ngIf="!overmind.state.isLoading">
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
