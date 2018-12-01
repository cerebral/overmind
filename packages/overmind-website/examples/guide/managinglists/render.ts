const javascript = {
  components: [
    {
      fileName: 'components/Posts.jsx',
      target: 'jsx',
      code: `
import { h } from 'overmind-components'

const Posts = ({ state }) => (
  <ul>
    {state.postsList.map(post => 
      <li key={post.id}>{post.title}</li>
    )}
  </ul>
)

export default Posts
    `,
    },
  ],
  react: [
    {
      fileName: 'components/Posts.jsx',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../app'

const Posts = ({ app }) => (
  <ul>
    {app.state.postsList.map(post => 
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
  <li v-for="post in app.state.postsList" :key="post.id>
  {{ post.title }}
  </li>
</ul>
    `,
    },
    {
      fileName: 'components/Posts.vue (script)',
      code: `
import { connect } from '../app'

export default connect({})
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
import { Component} from '../app'

const Posts: Component = ({ state }) => (
  <ul>
    {state.postsList.map(post => 
      <li key={post.id}>{post.title}</li>
    )}
  </ul>
)

export default App
    `,
    },
  ],
  react: [
    {
      fileName: 'components/Posts.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../app'

const Posts: React.SFC<Connect> = ({ app }) => (
  <ul>
    {app.state.postsList.map(post => 
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
import { connect } from '../app'

@Component({
  selector: 'app-posts',
  template: \`
  <ul>
    <li *ngFor="let post of app.state.postsList;trackby: trackById">
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
