const javascript = {
  react: [
    {
      fileName: 'Posts.js',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../overmind'

class Posts extends React.Component {
  componentDidMount() {
    this.props.overmind.actions.loadPosts()
  }
  render() {
    const { overmind } = this.props

    if (overmind.state.isLoadingPosts) {
      return <h4>Loading posts...</h4>
    }
  
    return (
      <ul>
        {overmind.state.posts.map(post => <li key={post.id}>{post.title}</li>)}
      </ul>
    )
  }
}

export default connect(Posts)
    `,
    },
  ],
  vue: [
    {
      fileName: 'Posts.vue (template)',
      target: 'markup',
      code: `
<h4 v-if="overmind.state.isLoadingPosts">
  Loading posts...
</h4>
<ul v-else>
  <li v-for="post in overmind.state.posts">
    {{post.title}}
  </li>
</ul>
    `,
    },
    {
      fileName: 'Posts.vue (script)',
      code: `
import { connect } from '../overmind'

export default connect({
  mounted() {
    this.overmind.actions.loadPosts()
  }
})
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
import { Connect, connect } from '../overmind'

class Posts extends React.Component<Connect> {
  componentDidMount() {
    this.props.overmind.actions.loadPosts()
  }
  render() {
    const { overmind } = this.props

    if (overmind.state.isLoadingPosts) {
      return <h4>Loading posts...</h4>
    }
  
    return (
      <ul>
        {overmind.state.posts.map(post => <li key={post.id}>{post.title}</li>)}
      </ul>
    )
  }
}

export default connect(Posts)
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
    this.overmind.actions.loadPosts()
  }
}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
