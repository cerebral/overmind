export const react = [
  {
    fileName: 'Posts.js',
    target: 'jsx',
    code: `
import React from 'react'
import { connect } from './app'

class Posts extends React.Component {
  render() {
    const { app } = this.props

    if (app.state.isLoadingPosts) {
      return <h4>Loading posts...</h4>
    }
  
    return <div />
  }
}

export default connect(Posts)
  `,
  },
]

export const reactTs = [
  {
    fileName: 'Posts.tsx',
    code: `
import * as React from 'react'
import { connect, Connect } from './app'

class Posts extends React.Component<Connect> {
  render() {
    const { app } = this.props

    if (app.state.isLoadingPosts) {
      return <h4>Loading posts...</h4>
    }
  
    return <div />
  }
}

export default connect(Posts)
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
import { connect } from './app'

export default connect({})
`,
  },
]

export const vueTs = vue
