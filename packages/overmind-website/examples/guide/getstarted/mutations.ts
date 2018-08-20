export const js = [
  {
    fileName: 'main/state.js',
    code: `
export default {
  isLoadingPosts: false
} 
    `,
  },
  {
    fileName: 'main/mutations.js',
    code: `
export const setLoadingPosts = state =>
  state.isLoadingPosts = true

export const unsetLoadingPosts = state =>
  state.isLoadingPosts = false

export const setPosts = (state, posts) =>
  state.posts = posts
  `,
  },
]

export const ts = [
  {
    fileName: 'main/state.ts',
    code: `
export type Post {
  id: number
  title: string
  body: string
}

type State = {
  isLoadingPosts: boolean
  posts: Post[]
}

const state: State = {
  isLoadingPosts: false,
  posts: []
}

export default state
    `,
  },
  {
    fileName: 'main/mutations.ts',
    code: `
import { Mutation } from '../app'
import { Post } from './state'

export const setLoadingPosts: Mutation = state =>
  state.isLoadingPosts = true

export const unsetLoadingPosts: Mutation = state =>
  state.isLoadingPosts = false

export const setPosts: Mutation<Post[]> = (state, posts) =>
  state.posts = posts
  `,
  },
]
