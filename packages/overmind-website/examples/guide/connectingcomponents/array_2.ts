const javascript = {
  components: [
    {
      fileName: 'components/List.js',
      target: 'jsx',
      code: `
import { h, useOvermind } from 'overmind-components'

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
  react: [
    {
      fileName: 'components/List.js',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../app'

const List = ({ overmind }) => (
  <ul>
    {overmind.state.items.map(item => 
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
  <li v-for="item in overmind.state.items" :key="item.id>
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
import { h, Component, useOvermind } from 'overmind-components'

const List: Component = () => {
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
  react: [
    {
      fileName: 'components/List.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../app'

const List: React.SFC<Connect> = ({ overmind }) => (
  <ul>
    {overmind.state.items.map(item => 
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
    <li *ngFor="let item of overmind.state.items;trackby: trackById">
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
