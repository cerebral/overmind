const javascript = {
  react: [
    {
      fileName: 'components/Post.jsx',
      target: 'jsx',
      code: `
import React from 'react'
import { useOvermind } from '../overmind'

const Post = ({ post }) => {
  useOvermind()

  return (
    <li>{post.title}</li>
  )
}

export default Post
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
export {
  props: ['post']
}
  `,
    },
    {
      fileName: 'components/Posts.vue (template)',
      target: 'markup',
      code: `
<ul>
  <post-component v-for="post in state.postsList" :post="post" :key="post.id" />
</ul>
    `,
    },
    {
      fileName: 'components/Posts.vue (script)',
      code: `
import PostComponent from './Post'

export default {
  name: 'Posts',
  components: {
    PostComponent,
  },
}
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
import { useOvermind } from '../overmind'
import { Post as TPost } from '../overmind/state'

type Props = {
  post: TPost
}

const Post: React.FunctionComponent<Props> = ({ post }) => {
  useOvermind()
  
  return (
    <li>{post.title}</li>
  )
}

export default Post
    `,
    },
    {
      fileName: 'components/Posts.tsx',
      code: `
import * as React from 'react'
import { connect, Connect } from '../overmind'
import Post from './Post'

const Posts: React.FunctionComponent<Connect> = ({ overmind }) => (
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
  vue: javascript.vue,
  angular: [
    {
      fileName: 'components/post.component.ts',
      code: `
import { Component,Input } from '@angular/core';
import { connect } from '../overmind'
import { Post } from '../overmind/state'

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
