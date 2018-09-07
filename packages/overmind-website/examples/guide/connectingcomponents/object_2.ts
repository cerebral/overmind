const javascript = {
  react: [
    {
      fileName: 'components/Item.js',
      target: 'jsx',
      code: `
import React from 'react'
import app from './app'

const Item = ({ item }) => (
  <li>{item.title}</li>
)

export default app.connect(Item)
    `,
    },
    {
      fileName: 'components/App.js',
      target: 'jsx',
      code: `
import React from 'react'
import app from './app'
import Item from './Item'

const App = ({ app }) => (
  <ul>
    {Object.keys(app.state.items).map(key => 
      <Item key={key} item={app.state.items[key]} />
    )}
  </ul>
)

export default app.connect(App)
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
import app from './app'

export default app.connect({
  props: ['item']
})
  `,
    },
    {
      fileName: 'components/List.vue (template)',
      target: 'markup',
      code: `
<ul>
  <li is="Item" v-for="item in app.state.items" v-bind:item="item" :key="item.id" />
</ul>
    `,
    },
    {
      fileName: 'components/List.vue (script)',
      code: `
import app from './app'
import Item from './Item'

export default app.connect({
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
import app, { Connect } from './app'

type Props = {
  item: { title: string }
}

const Item: React.SFC<Connect & Props> = ({ item }) => (
  <li>{item.title}</li>
)

export default app.connect(Item)
    `,
    },
    {
      fileName: 'components/List.tsx',
      code: `
import * as React from 'react'
import app, { Connect } from './app'
import Item from './Item'

const List: React.SFC<Connect> = ({ app }) => (
  <ul>
    {Object.keys(app.state.items).map(key => 
      <Item key={key} item={app.state.items[key]} />
    )}
  </ul>
)

export default app.connect(List)
    `,
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'components/item.component.ts',
      code: `
import { Component Input } from '@angular/core';
import app from '../app'
import { Item } from '../app/state'

@Component({
  selector: 'app-list-item',
  template: \`
  <li>
    {{item.title}}
  </li>
  \`
})
@app.connect()
export class List {
  @Input() item: Item;
}
    `,
    },
    {
      fileName: 'components/list.component.ts',
      code: `
import { Component } from '@angular/core';
import app from '../app'

@Component({
  selector: 'app-list',
  template: \`
  <ul>
    <app-list-item
      *ngFor="let id of keys(app.state.items);trackby: trackById"
      [item]="app.state.items[id]"
    ></app-list-item>
  </ul>
  \`
})
@app.connect()
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
