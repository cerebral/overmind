const javascript = {
  components: [
    {
      fileName: 'components/Item.js',
      target: 'jsx',
      code: `
import { h } from 'overmind-components'

const Item = ({ item }) => (
  <li>{item.title}</li>
)

export default Item
    `,
    },
    {
      fileName: 'components/App.js',
      target: 'jsx',
      code: `
import { h, useOvermind } from 'overmind-components'
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
  react: [
    {
      fileName: 'components/Item.js',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../app'

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
import { connect } from '../app'
import Item from './Item'

const App = ({ overmind }) => (
  <ul>
    {overmind.state.items.map(item => 
      <Item key={item.id} item={item} />
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
import { connect } from '../app'

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
import { connect } from '../app'
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
  components: [
    {
      fileName: 'components/Item.jsx',
      code: `
import { h, Component } from 'overmind-components'

type Props = {
  item: { title: string }
}

const Item: Component<Props> = ({ item }) => (
  <li>{item.title}</li>
)

export default Item
    `,
    },
    {
      fileName: 'components/List.tsx',
      code: `
import { h, Component, useOvermind } from 'overmind-components'
import Item from './Item'

const List: Component = () => {
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
  react: [
    {
      fileName: 'components/Item.jsx',
      code: `
import React from 'react'
import { connect, Connect } from '../app'

type Props = {
  item: { title: string }
} & Connect

const Item: React.SFC<Props> = ({ item }) => (
  <li>{item.title}</li>
)

export default connect(Item)
    `,
    },
    {
      fileName: 'components/List.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../app'
import Item from './Item'

const List: React.SFC<Connect> = ({ overmind }) => (
  <ul>
    {overmind.state.items.map(item => 
      <Item key={item.id} item={item} />
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
import { Component, Input } from '@angular/core';
import { connect } from '../app'
import { Item } from '../app/state'

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
import { connect } from '../app'

@Component({
  selector: 'app-list',
  template: \`
  <ul>
    <app-list-item
      *ngFor="let item of overmind.state.items;trackby: trackById"
      [item]="item"
    ></app-list-item>
  </ul>
  \`
})
@connect()
export class List {
  trackById(index, item) {
    return item.id
  }
}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
