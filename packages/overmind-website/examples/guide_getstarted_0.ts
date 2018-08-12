export const react = [
  {
    fileName: 'MyComponent.js',
    code: `
import React from 'react'

class MyComponent extends React.Component {
  render () {
    return <h1>Hello world!</h1>
  }
}

export default MyComponent
  `,
  },
]

export const reactTs = [
  {
    fileName: 'MyComponent.tsx',
    code: `
import * as React from 'react'
import { Connect } from '../app'

class MyComponent extends React.Component<Connect, {}> {
  render () {
    return <h1>Hello world!</h1>
  }
}

export default MyComponent
  `,
  },
]

export const vue = [
  {
    fileName: 'MyComponent.vue (template)',
    code: `
<div>{{message}}</div>
  `,
  },
  {
    fileName: 'MyComponent.vue (script)',
    code: `
import { connect } from '../app'

export default {

}
`,
  },
]

export const vueTs = vue
