const javascript = {
  react: [
    {
      fileName: 'App.js',
      target: 'jsx',
      code: `
import React from 'react'
import { json } from 'overmind'
import { LibraryComponent } from 'library'
import { useOvermind } from '../overmind'

const App = () => {
  const { state } = useOvermind()

  return <LibraryComponent config={json(state.config)} />
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
<library-component :config="config"></library-component>
    `,
    },
    {
      fileName: 'components/App.vue (script)',
      code: `
import { json } from 'overmind'
import { LibraryComponent } from 'library'

export default {
  name: 'App',
  data: (vue) => ({
    items: json(vue.state.config)
  }),
  components: {
    LibraryComponent
  }
}
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
import { json } from 'overmind'
import { LibraryComponent } from 'library'
import { useOvermind } from '../../overmind'

const App: React.FunctionComponent = () => {
  const { state } = useOvermind()

  return <LibraryComponent config={json(state.config)} />
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
import { json } from 'overmind'
import { Store } from '../overmind'

@Component({
  selector: 'app-root',
  template: \`
  <library-component [config]="config">
  \`
})
export class App {
  config = json(this.store.select(state => state.config))
  constructor(private store: Store) {}
}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
