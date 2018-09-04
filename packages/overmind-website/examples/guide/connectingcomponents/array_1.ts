const javascript = {
  react: [
    {
      fileName: 'components/List.js',
      target: 'jsx',
      code: `
import React from 'react'
import app from './app'

const List = ({ app }) => (
  <h1>{app.state.items}</h1>
)

export default app.connect(List)
    `,
    },
  ],
  vue: [
    {
      fileName: 'components/List.vue (template)',
      target: 'markup',
      code: `
<h1>{{app.state.items}}</h1>
    `,
    },
    {
      fileName: 'components/List.vue (script)',
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
      fileName: 'components/List.tsx',
      code: `
import * as React from 'react'
import app, { Connect } from './app'

const List: React.SFC<Connect> = ({ app }) => (
  <h1>{app.state.items}</h1>
)

export default app.connect(List)
    `,
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'components/list.component.ts',
      code: `
import { Component } from '@angular/core';
import app from '../app'

@Component({
  selector: 'app-list',
  template: \`
  <h1>{{app.state.items}}</h1>
  \`
})
@app.connect()
export class List {}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
