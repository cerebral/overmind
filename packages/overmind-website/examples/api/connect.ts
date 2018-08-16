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

export default connect(SomeComponent)
  `,
  },
]

export const reactTs = [
  {
    fileName: 'components/SomeComponent.tsx',
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

export default connect(SomeComponent)
  `,
  },
]

export const vue = [
  {
    fileName: 'components/SomeComponent.vue (template)',
    code: `
<div v-on:click="app.actions.onClick">
  {{app.state.foo}}
</div>
  `,
  },
  {
    fileName: 'components/SomeComponent.vue (script)',
    code: `
import { connect } from '../app'

export default connect({})
`,
  },
]

export const vueTs = vue
