const javascript = {
  react: [
    {
      fileName: 'components/App.js',
      target: 'jsx',
      code: `
import React from 'react'
import { useOvermind } from '../overmind'

const App = () => {
  const { reaction } = useOvermind()

  React.useEffect(() => reaction(
    ({ currentPage }) => currentPage,
    () => {
      document.querySelector('#page').scrollTop = 0
    }
  ))

  return <div id="page"></div>
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
<div id="page"></div>
    `,
    },
    {
      fileName: 'components/App.vue (script)',
      code: `
export default {
  mounted() {
    this.overmind.reaction(
      ({ currentPage }) => currentPage,
      () => {
        document.querySelector('#page').scrollTop = 0
      }     
    )
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
import { useOvermind } from '../overmind'

const App: React.FC = () => {
  const { reaction } = useOvermind()

  React.useEffect(() => reaction(
    ({ currentPage }) => currentPage,
    () => {
      document.querySelector('#page').scrollTop = 0
    }
  ))

  return <div id="page"></div>
}

export default App
    `,
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'components/app.component.ts',
      code: `
import { Component } from '@angular/core';
import { Store } from '../overmind'

@Component({
  selector: 'app-root',
  template: \`
  <div id="page"></div>
  \`
})
export class App {
  constructor(private store: Store) {}
  ngOnInit() {
    this.store.reaction(
      ({ currentPage }) => currentPage,
      () => {
        document.querySelector('#page').scrollTop = 0
      }    
    )
  }
}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
