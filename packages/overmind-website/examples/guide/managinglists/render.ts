const javascript = {
  react: [
    {
      fileName: 'components/Posts.jsx',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../overmind'

const Posts = ({ overmind }) => (
  <ul>
    {overmind.state.postsList.map(post => 
      <li key={post.id}>{post.title}</li>
    )}
  </ul>
)

export default connect(Posts)
    `,
    },
  ],
  vue: [
    {
      fileName: 'components/Posts.vue (template)',
      target: 'markup',
      code: `
<ul>
  <li v-for="post in overmind.state.postsList" :key="post.id>
  {{ post.title }}
  </li>
</ul>
    `,
    },
    {
      fileName: 'components/Posts.vue (script)',
      code: `
import { connect } from '../overmind'

export default connect({})
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
import { connect, Connect } from '../overmind'

const Posts: React.SFC<Connect> = ({ overmind }) => (
  <ul>
    {overmind.state.postsList.map(post => 
      <li key={post.id}>{post.title}</li>
    )}
  </ul>
)

export default connect(App)
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
