const javascript = {
  react: [
    {
      fileName: 'overmind/actions.js',
      code: `
import { parallel, action } from 'overmind'

export const grabData = parallel(
  action(async ({ state, api }) => {
    state.posts = await api.getPosts()
  }),
  action(async ({ state, api }) => {
    state.users = await api.getUsers()
  })
)  
`,
    },
    {
      fileName: 'components/MyComponent.jsx',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../overmind'

const MyComponent = ({ overmind }) => (
  <button onClick={overmind.actions.grabData}>
    Grab some data
  </button>
)

export default connect(MyComponent)
    `,
    },
  ],
  vue: [
    {
      fileName: 'overmind/actions.js',
      code: `
import { parallel, action } from 'overmind'

export const grabData = parallel(
  action(async ({ state, api }) => {
    state.posts = await api.getPosts()
  }),
  action(async ({ state, api }) => {
    state.users = await api.getUsers()
  })
)  
`,
    },
    {
      fileName: 'components/MyComponent.vue (template)',
      target: 'markup',
      code: `
<button on:click="overmind.actions.grabData()">
  Grab some data
</button>
    `,
    },
    {
      fileName: 'components/MyComponent.vue (script)',
      code: `
import { connect } from '../overmind'

export default connect({})
  `,
    },
  ],
}

const typescript = {
  react: [
    {
      fileName: 'overmind/actions.js',
      code: `
import { Operator, parallel, action } from 'overmind'

export const grabData: Operator = parallel(
  action(async ({ state, api }) => {
    state.posts = await api.getPosts()
  }),
  action(async ({ state, api }) => {
    state.users = await api.getUsers()
  })
)  
`,
    },
    {
      fileName: 'components/MyComponent.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../overmind'

type Props = Connect

const MyComponent: React.SFC<Props> = ({ overmind }) => (
  <button onClick={overmind.actions.grabData}>
    Grab some data
  </button>
)

export default connect(MyComponent)
    `,
    },
  ],
  vue: [
    {
      fileName: 'overmind/actions.ts',
      code: `
import { Operator, parallel, action } from 'overmind'

export const grabData: Operator = parallel(
  action(async ({ state, api }) => {
    state.posts = await api.getPosts()
  }),
  action(async ({ state, api }) => {
    state.users = await api.getUsers()
  })
)  
`,
    },
    {
      fileName: 'components/MyComponent.vue (template)',
      target: 'markup',
      code: `
<button on:click="overmind.actions.grabData()">
  Grab some data
</button>
    `,
    },
    {
      fileName: 'components/MyComponent.vue (script)',
      code: `
import { connect } from '../overmind'

export default connect({})
  `,
    },
  ],
  angular: [
    {
      fileName: 'overmind/actions.js',
      code: `
import { Operator, parallel, action } from 'overmind'

export const grabData: Operator = parallel(
  action(async ({ state, api }) => {
    state.posts = await api.getPosts()
  }),
  action(async ({ state, api }) => {
    state.users = await api.getUsers()
  })
)  
`,
    },
    {
      fileName: 'components/grabdata.component.ts',
      code: `
import { Component,Input } from '@angular/core';
import { connect } from '../overmind'

@Component({
  selector: 'grab-data',
  template: \`
  <button (click)="overmind.actions.grabData()">
    Grab some data
  </button>
  \`
})
@connect()
export class GrabData {}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
