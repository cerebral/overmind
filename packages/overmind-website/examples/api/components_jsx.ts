export default (ts) =>
  ts
    ? [
        {
          code: `
import { h, Component } from 'overmind-components'

const MyComponent: Component = () => h('h1', null, 'Hello')
`,
        },
      ]
    : [
        {
          code: `
import { h } from 'overmind-components'

const MyComponent = () => h('h1', null, 'Hello')
`,
        },
      ]
