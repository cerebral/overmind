const javascript = {
  react: [
    {
      fileName: 'components/Post.jsx',
      target: 'jsx',
      code: `
import React from 'react'
import { connect } from '../overmind'

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
import { connect } from '../overmind'
import Post from './Post'

const Posts = ({ overmind }) => (
  <ul>
    {overmind.state.postsList.map(post => 
      <Post key={post.id} post={post} />
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
import { connect } from '../overmind'

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
  <post-component v-for="post in overmind.state.postsList" v-bind:post="post" :key="post.id" />
</ul>
    `,
    },
    {
      fileName: 'components/Posts.vue (script)',
      code: `
import { connect } from '../overmind'
import PostComponent from './Post'

export default connect({
  components: {
    PostComponent,
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
import { connect, Connect } from '../overmind'
import { Post as TPost } from '../overmind/state'

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
import { connect, Connect } from '../overmind'
import Post from './Post'

const Posts: React.SFC<Connect> = ({ overmind }) => (
  <ul>
    {overmind.state.postsList.map(post => 
      <Item key={post.id} post={post} />
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
import { connect } from '../overmind'
import { Item } from '../overmind/state'

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
import { connect } from '../overmind'

@Component({
  selector: 'app-posts',
  template: \`
  <ul>
    <app-post
      *ngFor="let post of overmind.state.postsList;trackby: trackById"
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
