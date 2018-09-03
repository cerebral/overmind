export const react = [
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
    {app.state.items.map(item => 
      <Item key={item.id} item={item} />
    )}
  </ul>
)

export default app.connect(App)
  `,
  },
]

export const reactTs = [
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
    {app.state.items.map(item => 
      <Item key={item.id} item={item} />
    )}
  </ul>
)

export default app.connect(List)
  `,
  },
]

export const vue = [
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
]

export const vueTs = vue

export const angularTs = [
  {
    fileName: 'components/item.component.ts',
    code: `
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import app from '../app'
import { Item } from '../app/state'

@Component({
  selector: 'app-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
  <li>
    {{item.title}}
  </li>
  \`
})
@app.connect()
export class List {
  @Input() item: Item;
  constructor(private cdr: ChangeDetectorRef) {}
}
  `,
  },
  {
    fileName: 'components/list.component.ts',
    code: `
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import app from '../app'

@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
  <ul>
    <app-list-item
      *ngFor="let item of app.state.items;trackby: trackById"
      [item]="item"
    ></app-list-item>
  </ul>
  \`
})
@app.connect()
export class List {
  constructor(private cdr: ChangeDetectorRef) {}
  trackById(index, item) {
    return item.id
  }
}
  `,
  },
]
