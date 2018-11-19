const javascript = {
  react: [
    {
      fileName: 'components/Post.jsx',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../app'

const Post = ({ post }) => (
  <li>{post.title}</li>
)

export default connect(Post)
    `,
    },
    {
      fileName: 'components/Posts.jsx',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../app'
import Post from './Post'

const Posts = ({ app }) => (
  <ul>
    {app.state.postsList.map(post => 
      <Item key={post.id} post={post} />
    )}
  </ul>
)

export default connect(Posts)
    `,
    },
  ],
  vue: [
    {
      fileName: 'components/Post.vue (template)',
      target: 'markup',
      code: `
<li>{{ post.title }}</li>
    `,
    },
    {
      fileName: 'components/Post.vue (script)',
      code: `
import { connect } from '../app'

export default connect({
  props: ['post']
})
  `,
    },
    {
      fileName: 'components/Posts.vue (template)',
      target: 'markup',
      code: `
<ul>
  <li is="Post" v-for="post in app.state.postsList" v-bind:post="post" :key="post.id" />
</ul>
    `,
    },
    {
      fileName: 'components/Posts.vue (script)',
      code: `
import { connect } from '../app'
import Post from './Post'

export default connect({
  components: {
    Post,
  },
})
  `,
    },
  ],
}

const typescript = {
  react: [
    {
      fileName: 'components/Post.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../app'
import { Post as TPost } from '../app/state'

type Props = {
  post: TPost
} & Connect

const Post: React.SFC<Props> = ({ post }) => (
  <li>{post.title}</li>
)

export default connect(Post)
    `,
    },
    {
      fileName: 'components/Posts.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../app'
import Post from './Post'

const Posts: React.SFC<Connect> = ({ app }) => (
  <ul>
    {app.state.postsList.map(post => 
      <Post key={post.id} post={post} />
    )}
  </ul>
)

export default connect(Posts)
    `,
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'components/post.component.ts',
      code: `
import { Component,Input } from '@angular/core';
import { connect } from '../app'
import { Item } from '../app/state'

@Component({
  selector: 'app-post',
  template: \`
  <li>
    {{post.title}}
  </li>
  \`
})
@connect()
export class List {
  @Input() post: Post;
}
    `,
    },
    {
      fileName: 'components/posts.component.ts',
      code: `
import { Component } from '@angular/core';
import { connect } from '../app'

@Component({
  selector: 'app-posts',
  template: \`
  <ul>
    <app-post
      *ngFor="let post of app.state.postsList;trackby: trackById"
      [post]="post"
    ></app-post>
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
