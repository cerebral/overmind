export const react = [
  `
import React from 'react'

class MyComponent extends React.Component {
  render () {
    return <h1>Hello world!</h1>
  }
}

export default MyComponent
`,
]

export const reactTs = [
  `
import * as React from 'react'
import { Connect } from '../app'

class MyComponent extends React.Component<Connect, {}> {
  render () {
    return <h1>Hello world!</h1>
  }
}

export default MyComponent
`,
]

export const vue = [
  `
<div>{{message}}</div>
`,
  `
import { connect } from '../app'

export default {

}
`,
]

export const vueTs = [
  `
<div>{{message}}</div>
`,
  `
import { connect } from '../app'

export default {

}
`,
]
