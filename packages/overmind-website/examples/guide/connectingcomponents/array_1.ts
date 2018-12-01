const javascript = {
  components: [
    {
      fileName: 'components/List.js',
      target: 'jsx',
      code: `
import { h } from 'overmind-components'

const List = ({ state }) => (
  <h1>{state.items}</h1>
)

export default List
    `,
    },
  ],
  react: [
    {
      fileName: 'components/List.js',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../app'

const List = ({ app }) => (
  <h1>{app.state.items}</h1>
)

export default connect(List)
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
import { connect } from '../app'

export default connect({})
  `,
    },
  ],
}

const typescript = {
  components: [
    {
      fileName: 'components/List.tsx',
      code: `
import { h } from 'overmind-components'
import { Component } from '../app'

const List: Component = ({ state }) => (
  <h1>{state.items}</h1>
)

export default List
    `,
    },
  ],
  react: [
    {
      fileName: 'components/List.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../app'

const List: React.SFC<Connect> = ({ app }) => (
  <h1>{app.state.items}</h1>
)

export default connect(List)
    `,
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'components/list.component.ts',
      code: `
import { Component } from '@angular/core';
import { connect } from '../app'

@Component({
  selector: 'app-list',
  template: \`
  <h1>{{app.state.items}}</h1>
  \`
})
@connect()
export class List {}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
