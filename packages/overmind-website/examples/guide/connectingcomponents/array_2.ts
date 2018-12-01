const javascript = {
  components: [
    {
      fileName: 'components/List.js',
      target: 'jsx',
      code: `
import { h } from 'overmind-components'

const List = ({ state }) => (
  <ul>
    {state.items.map(item => 
      <li key={item.id}>{item.title}</li>
    )}
  </ul>
)

export default List
    `,
    },
  ],
  react: [
    {
      fileName: 'components/List.js',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../app'

const List = ({ app }) => (
  <ul>
    {app.state.items.map(item => 
      <li key={item.id}>{item.title}</li>
    )}
  </ul>
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
<ul>
  <li v-for="item in app.state.items" :key="item.id>
  {{ item.title }}
  </li>
</ul>
    `,
    },
    {
      fileName: 'components/List.vue (script)',
      code: `
import { connect } from '../app'

export default connect({})
  `,
    },
  ],
}

const typescript = {
  components: [
    {
      fileName: 'components/List.tsx',
      code: `
import { h } from 'overmind-components'
import { Component } from '../app'

const List: Component = ({ state }) => (
  <ul>
    {state.items.map(item => 
      <li key={item.id}>{item.title}</li>
    )}
  </ul>
)

export default App
    `,
    },
  ],
  react: [
    {
      fileName: 'components/List.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../app'

const List: React.SFC<Connect> = ({ app }) => (
  <ul>
    {app.state.items.map(item => 
      <li key={item.id}>{item.title}</li>
    )}
  </ul>
)

export default connect(App)
    `,
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'components/list.component.ts',
      code: `
import { Component } from '@angular/core';
import { connect } from '../app'

@Component({
  selector: 'app-list',
  template: \`
  <ul>
    <li *ngFor="let item of app.state.items;trackby: trackById">
      {{item.title}}
    </li>
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
