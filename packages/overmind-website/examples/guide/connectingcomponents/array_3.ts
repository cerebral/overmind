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
    {app.state.myArray.map(item => 
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
    {app.state.myArray.map(item => 
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
  <li is="Item" v-for="item in app.state.myArray" v-bind:item="item" :key="item.id" />
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
