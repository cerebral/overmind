export const react = [
  {
    fileName: 'components/SomeComponent.js',
    code: `
import React from 'react'
import { connect } from '../app'

const SomeComponent = ({ app }) => {
  return (
    <div onClick={app.actions.onClick}>
      {app.state.foo}
    </div>
  )
}

export default connect(MyComponent)
  `,
  },
]

export const reactTs = [
  {
    fileName: 'MyComponent.tsx',
    code: `
import * as React from 'react'
import { connect, Connect } from '../app'

const SomeComponent: React.SFC<Connect, {}> = ({ app }) => {
  return (
    <div onClick={app.actions.onClick}>
      {app.state.foo}
    </div>
  )
}

export default connect(MyComponent)
  `,
  },
]

export const vue = [
  {
    fileName: 'SomeComponent.vue (template)',
    code: `
<div v-on:click="app.actions.onClick">
  {{app.state.foo}}
</div>
  `,
  },
  {
    fileName: 'SomeComponent.vue (script)',
    code: `
import { connect } from '../app'

export default connect({})
`,
  },
]

export const vueTs = vue
