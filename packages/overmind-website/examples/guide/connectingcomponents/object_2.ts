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
      {Object.keys(state.items).map(key => 
        <Item key={key} item={state.items[key]} />
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
      fileName: 'components/Item.jsx',
      code: `
import React from 'react'
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

const List: React.FunctionComponent = () => {
  const { state } = useOvermind()

  return (
    <ul>
      {Object.keys(state.items).map(key => 
        <Item key={key} item={state.items[key]} />
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
import { Component Input } from '@angular/core';
import { connect } from '../overmind'
import { Item } from '../overmind/state'

@Component({
  selector: 'app-list-item',
  template: \`
  <li>
    {{item.title}}
  </li>
  \`
})
@connect()
export class List {
  @Input() item: Item;
}
    `,
    },
    {
      fileName: 'components/list.component.ts',
      code: `
import { Component } from '@angular/core';
import { connect } from '../overmind'

@Component({
  selector: 'app-list',
  template: \`
  <ul>
    <app-list-item
      *ngFor="let id of keys(overmind.state.items);trackby: trackById"
      [item]="overmind.state.items[id]"
    ></app-list-item>
  </ul>
  \`
})
@connect()
export class List {
  keys =  Object.keys
  trackById(index, id) {
    return id
  }
}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
