const javascript = {
  react: [
    {
      fileName: 'components/List.js',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../overmind'

const List = ({ overmind }) => (
  <h1>{overmind.state.items}</h1>
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
<h1>{{ state.items }}</h1>
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
import { connect, Connect } from '../overmind'

const List: React.FunctionComponent<Connect> = ({ overmind }) => (
  <h1>{overmind.state.items}</h1>
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
import { connect } from '../overmind'

@Component({
  selector: 'app-list',
  template: \`
  <h1>{{overmind.state.items}}</h1>
  \`
})
@connect()
export class List {}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
