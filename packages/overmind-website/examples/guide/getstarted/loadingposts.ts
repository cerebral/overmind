const javascript = {
  components: [
    {
      fileName: 'Posts.js',
      target: 'jsx',
      code: `
import { h } from 'overmind-components'

const Posts = () => {
  if (state.isLoadingPosts) {
    return <h4>Loading posts...</h4>
  }

  return <div />
}

export default Posts
    `,
    },
  ],
  react: [
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
  ],
  vue: [
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
  ],
}

const typescript = {
  components: [
    {
      fileName: 'components/Posts.tsx',
      code: `
import { h } from 'overmind-components'

const Posts = ({ state }) => {
  if (state.isLoadingPosts) {
    return <h4>Loading posts...</h4>
  }

  return <div />
}

export default Posts
    `,
    },
  ],
  react: [
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
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'posts.component.ts',
      code: `
import { Component } from '@angular/core';

@Component({
  selector: 'posts-list',
  template: \`
  <h4 *ngIf="app.state.isLoadingPosts">
    Loading posts...
  </h4>
  <div *ngIf="!app.state.isLoadingPosts"></div>
  \`
})
export class PostsList {}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
