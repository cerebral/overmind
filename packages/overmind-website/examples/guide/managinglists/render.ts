const javascript = {
  react: [
    {
      fileName: 'components/Posts.jsx',
      target: 'jsx',
      code: `
import React from 'react'
import { useOvermind } from '../overmind'

const Posts = () => {
  const { state } = useOvermind()

  return (
    <ul>
      {state.postsList.map(post => 
        <li key={post.id}>{post.title}</li>
      )}
    </ul>
  )
}

export default Posts
    `,
    },
  ],
  vue: [
    {
      fileName: 'components/Posts.vue (template)',
      target: 'markup',
      code: `
<ul>
  <li v-for="post in state.postsList" :key="post.id>
    {{ post.title }}
  </li>
</ul>
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
  const { state } = useOvermind()

  return (
    <ul>
      {state.postsList.map(post => 
        <li key={post.id}>{post.title}</li>
      )}
    </ul>
  )
}

export default App
    `,
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'components/posts.component.ts',
      code: `
import { Component } from '@angular/core';
import { connect } from '../overmind'

@Component({
  selector: 'app-posts',
  template: \`
  <ul>
    <li *ngFor="let post of overmind.state.postsList;trackby: trackById">
      {{post.title}}
    </li>
  </ul>
  \`
})
@connect()
export class List {
  trackById(index, post) {
    return post.id
  }
}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
