const javascript = {
  react: [
    {
      fileName: 'App.js',
      target: 'jsx',
      code: `
import React from 'react'
import { useOvermind } from '../overmind'

const App = () => {
  const { state } = useOvermind()

  if (overmind.state.isLoading) {
    return <div>Loading app...</div>
  }

  return <h1>My awesome app</h1>
}

export default App
    `,
    },
  ],
  vue: [
    {
      fileName: 'components/App.vue (template)',
      target: 'markup',
      code: `
<div v-if="state.isLoading">
  Loading app...
</div>
<h1 v-else>My awesome app</h1>
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
import { useOvermind } from '../../overmind'

const App: React.FunctionComponent = () => {
  const { state } = useOvermind()

  if (state.isLoading) {
    return <div>Loading app...</div>
  }

  return <h1>My awesome app</h1>
}

export default App
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
