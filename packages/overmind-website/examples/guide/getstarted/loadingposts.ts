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

export const angularTs = [
  {
    fileName: 'posts.component.ts',
    code: `
import { Component } from '@angular/core';
import app from '../app'

@Component({
  selector: 'posts-list',
  template: \`
  <h1>foo</h1>
  \`
})
@app.connect()
export class SomeComponent {
  constructor(private cdr: ChangeDetectorRef) {
    this.app.reaction(
      'scrollUpOnNotification',
      state => state.notifications,
      () => {
        window.scrollTop = 0
      }  
    )
  }
}
  `,
  },
]
