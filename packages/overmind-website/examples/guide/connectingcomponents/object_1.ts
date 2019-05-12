const javascript = {
  react: [
    {
      fileName: 'components/List.js',
      target: 'jsx',
      code: `
import React from 'react'
import { useOvermind } from '../overmind'

const List = () => {
  const { state } = useOvermind()

  return (
    <h1>{state.items}</h1>
  )
}

export default List
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
import { useOvermind } from '../overmind'

const List: React.FunctionComponent = () => {
  const { state } = useOvermind()

  return (
    <h1>{state.items}</h1>
  )
}

export default List
    `,
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'components/list.component.ts',
      code: `
import { Component } from '@angular/core';
import { Store } from '../overmind'

@Component({
  selector: 'app-list',
  template: \`
  <h1>{{state.items}}</h1>
  \`
})
export class List {
  state = this.store.select()
  constructor(private store: Store) {}
}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
