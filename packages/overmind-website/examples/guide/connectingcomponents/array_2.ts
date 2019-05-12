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
    <ul>
      {state.items.map(item => 
        <li key={item.id}>{item.title}</li>
      )}
    </ul>
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
<ul>
  <li v-for="item in state.items" :key="item.id>
    {{ item.title }}
  </li>
</ul>
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
    <ul>
      {state.items.map(item => 
        <li key={item.id}>{item.title}</li>
      )}
    </ul>
  )
}

export default App
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
  <ul>
    <li *ngFor="let item of state.items;trackby: trackById">
      {{item.title}}
    </li>
  </ul>
  \`
})
export class List {
  state = this.store.select()
  constructor(private store: Store) {}
  trackById(index, item) {
    return item.id
  }
}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
