export const react = [
  {
    fileName: 'Posts.js',
    target: 'jsx',
    code: `
import React from 'react'
import app from './app'

class Posts extends React.Component {
  render() {
    const { app } = this.props

    if (app.state.isLoadingPosts) {
      return <h4>Loading posts...</h4>
    }
  
    return <div />
  }
}

export default app.connect(Posts)
  `,
  },
]

export const reactTs = [
  {
    fileName: 'components/Posts.tsx',
    code: `
import * as React from 'react'
import app, { Connect } from './app'

class Posts extends React.Component<Connect> {
  render() {
    const { app } = this.props

    if (app.state.isLoadingPosts) {
      return <h4>Loading posts...</h4>
    }
  
    return <div />
  }
}

export default app.connect(Posts)
  `,
  },
]

export const vue = [
  {
    fileName: 'Posts.vue (template)',
    target: 'markup',
    code: `
<h4 v-if="app.state.isLoadingPosts">
  Loading posts...
</h4>
<div v-else></div>
  `,
  },
  {
    fileName: 'Posts.vue (script)',
    code: `
import app from './app'

export default app.connect({})
`,
  },
]

export const vueTs = vue
