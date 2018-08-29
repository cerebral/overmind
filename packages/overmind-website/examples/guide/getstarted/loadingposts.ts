export const react = [
  {
    fileName: 'Posts.js',
    target: 'jsx',
    code: `
import React from 'react'

class Posts extends React.Component {
  render() {
    const { app } = this.props

    if (app.state.isLoadingPosts) {
      return <h4>Loading posts...</h4>
    }
  
    return <div />
  }
}

export default Posts
  `,
  },
]

export const reactTs = [
  {
    fileName: 'components/Posts.tsx',
    code: `
import * as React from 'react'

class Posts extends React.Component {
  render() {
    const { app } = this.props

    if (app.state.isLoadingPosts) {
      return <h4>Loading posts...</h4>
    }
  
    return <div />
  }
}

export default Posts
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
export default {}
`,
  },
]

export const vueTs = vue
