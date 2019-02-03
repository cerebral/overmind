const javascript = {
  react: [
    {
      fileName: 'Posts.js',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../overmind'

class Posts extends React.Component {
  render() {
    const { overmind } = this.props

    if (overmind.state.isLoadingPosts) {
      return <h4>Loading posts...</h4>
    }
  
    return <div />
  }
}

export default connect(Posts)
    `,
    },
  ],
  vue: [
    {
      fileName: 'index.js',
      code: `
import Vue from 'vue'
import { OvermindPlugin } from './overmind'
import Posts from './components/Posts'

Vue.use(OvermindPlugin)

new Vue({
  el: '#app',
  render: (h) => h(App),
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
  render() {
    const { overmind } = this.props

    if (overmind.state.isLoadingPosts) {
      return <h4>Loading posts...</h4>
    }
  
    return <div />
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
  <div *ngIf="!overmind.state.isLoadingPosts"></div>
  \`
})
@connect()
export class PostsList {}
    `,
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
