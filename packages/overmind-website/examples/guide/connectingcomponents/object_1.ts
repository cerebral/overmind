export const react = [
  {
    fileName: 'components/List.js',
    target: 'jsx',
    code: `
import React from 'react'
import app from './app'

const List = ({ app }) => (
  <h1>{app.state.myObject}</h1>
)

export default app.connect(List)
  `,
  },
]

export const reactTs = [
  {
    fileName: 'components/List.tsx',
    code: `
import * as React from 'react'
import app, { Connect } from './app'

const List: React.SFC<Connect> = ({ app }) => (
  <h1>{app.state.myObject}</h1>
)

export default app.connect(List)
  `,
  },
]

export const vue = [
  {
    fileName: 'components/List.vue (template)',
    target: 'markup',
    code: `
<h1>{{app.state.myObject}}</h1>
  `,
  },
  {
    fileName: 'components/List.vue (script)',
    code: `
import app from './app'

export default app.connect({})
`,
  },
]

export const vueTs = vue
