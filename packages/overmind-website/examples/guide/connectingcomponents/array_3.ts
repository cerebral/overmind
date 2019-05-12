const javascript = {
  react: [
    {
      fileName: 'components/Item.js',
      target: 'jsx',
      code: `
import React from 'react'
import { useOvermind } from '../overmind'

const Item = ({ item }) => {
  useOvermind()

  return (
    <li>{item.title}</li>
  )
}

export default Item
    `,
    },
    {
      fileName: 'components/App.js',
      target: 'jsx',
      code: `
import React from 'react'
import { useOvermind } from '../overmind'
import Item from './Item'

const App = () => {
  const { state } = useOvermind()

  return (
    <ul>
      {state.items.map(item => 
        <Item key={item.id} item={item} />
      )}
    </ul>
  )
}

export default App
    `,
    },
  ],
  vue: [
    {
      fileName: 'components/Item.vue (template)',
      target: 'markup',
      code: `
{{ item.title }}
    `,
    },
    {
      fileName: 'components/Item.vue (script)',
      code: `
export default {
  name: 'Item',
  props: ['item']
}
  `,
    },
    {
      fileName: 'components/List.vue (template)',
      target: 'markup',
      code: `
<ul>
  <li is="Item" v-for="item in state.items" :item="item" :key="item.id" />
</ul>
    `,
    },
    {
      fileName: 'components/List.vue (script)',
      code: `
import Item from './Item'

export default {
  name: 'List',
  components: {
    Item,
  },
}
  `,
    },
  ],
}

const typescript = {
  react: [
    {
      fileName: 'components/Item.tsx',
      code: `
import * as React from 'react'
import { useOvermind } from '../overmind'

type Props = {
  item: { title: string }
}

const Item: React.FunctionComponent<Props> = ({ item }) => {
  useOvermind()

  return (
    <li>{item.title}</li>
  )
}

export default Item
    `,
    },
    {
      fileName: 'components/List.tsx',
      code: `
import * as React from 'react'
import { useOvermind } from '../overmind'
import Item from './Item'

const List: React.FunctionComponent = () => 
  const { state } = useOvermind()

  return (
    <ul>
      {state.items.map(item => 
        <Item key={item.id} item={item} />
      )}
    </ul>
  )
}

export default List
    `,
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'components/item.component.ts',
      code: `
import { Component, Input } from '@angular/core';
import { connect } from '../overmind'
import { Item } from '../overmind/state'

@Component({
  selector: 'app-list-item',
  template: \`
  <li *track>
    {{item.title}}
  </li>
  \`
})
export class List {
  @Input() item: Item;
}
    `,
    },
    {
      fileName: 'components/list.component.ts',
      code: `
import { Component } from '@angular/core';
import { Store } from '../overmind'

@Component({
  selector: 'app-list',
  template: \`
  <ul *track>
    <app-list-item
      *ngFor="let item of state.items;trackby: trackById"
      [item]="item"
    ></app-list-item>
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
