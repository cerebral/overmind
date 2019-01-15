const javascript = {
  react: [
    {
      fileName: 'components/Item.js',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../overmind'

const Item = ({ item }) => (
  <li>{item.title}</li>
)

export default connect(Item)
    `,
    },
    {
      fileName: 'components/App.js',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../overmind'
import Item from './Item'

const App = ({ overmind }) => (
  <ul>
    {Object.keys(overmind.state.items).map(key => 
      <Item key={key} item={overmind.state.items[key]} />
    )}
  </ul>
)

export default connect(App)
    `,
    },
  ],
  vue: [
    {
      fileName: 'components/Item.vue (template)',
      target: 'markup',
      code: `
<li>{{ item.title }}</li>
    `,
    },
    {
      fileName: 'components/Item.vue (script)',
      code: `
import { connect } from '../overmind'

export default connect({
  props: ['item']
})
  `,
    },
    {
      fileName: 'components/List.vue (template)',
      target: 'markup',
      code: `
<ul>
  <li is="Item" v-for="item in overmind.state.items" v-bind:item="item" :key="item.id" />
</ul>
    `,
    },
    {
      fileName: 'components/List.vue (script)',
      code: `
import { connect } from '../overmind'
import Item from './Item'

export default connect({
  components: {
    Item,
  },
})
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
import { connect, Connect } from '../overmind'

type Props = {
  item: { title: string }
} & Connect

const Item: React.FunctionComponent<Props> = ({ item }) => (
  <li>{item.title}</li>
)

export default connect(Item)
    `,
    },
    {
      fileName: 'components/List.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../overmind'
import Item from './Item'

const List: React.FunctionComponent<Connect> = ({ overmind }) => (
  <ul>
    {Object.keys(overmind.state.items).map(key => 
      <Item key={key} item={overmind.state.items[key]} />
    )}
  </ul>
)

export default connect(List)
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
