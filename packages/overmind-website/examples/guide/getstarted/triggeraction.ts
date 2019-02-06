const javascript = {
  react: [
    {
      fileName: 'Posts.js',
      target: 'jsx',
      code: `
import React, { useEffect } from 'react'
import { useOvermind } from '../overmind'

const Posts = () => {
  const { state, actions } = useOvermind()

  useEffect(() => actions.getPosts(), [])

  if (state.isLoadingPosts) {
    return <h4>Loading posts...</h4>
  }

  return (
    <ul>
      {state.posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  )
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
<h4 v-if="state.isLoadingPosts">
  Loading posts...
</h4>
<ul v-else>
  <li v-for="post in state.posts">
    {{ post.title }}
  </li>
</ul>
    `,
    },
    {
      fileName: 'Posts.vue (script)',
      code: `
export default {
  mounted() {
    this.actions.getPosts()
  }
}
  `,
    },
  ],
}

const typescript = {
  react: [
    {
      fileName: 'components/Posts.tsx',
      code: `
import * as React from 'react'
import { useOvermind } from '../overmind'

const Posts: React.FunctionComponent = () => {
  const { state, actions } = useOvermind()

  React.useEffect(() => actions.getPosts(), [])

  if (state.isLoadingPosts) {
    return <h4>Loading posts...</h4>
  }

  return (
    <ul>
      {state.posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  )
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
import { connect } from '../overmind'

@Component({
  selector: 'posts-list',
  template: \`
  <h4 *ngIf="overmind.state.isLoadingPosts">
    Loading posts...
  </h4>
  <ul *ngIf="!overmind.state.isLoadingPosts">
    <li *ngFor="let post of overmind.state.posts">
      {{post.title}}
    </li>
  </ul>
  \`
})
@connect()
export class PostsList {
  ngOnInit() {
    this.overmind.actions.getPosts()
  }
}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
