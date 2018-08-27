export const js = [
  {
    fileName: 'app/state.js',
    code: `
export let isLoadingPosts = false

export let posts = []
    `,
  },
  {
    fileName: 'app/mutations.js',
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
    fileName: 'app/state.ts',
    code: `
export type Post {
  id: number
  title: string
  body: string
}

export let isLoadingPosts: boolean = false

export let posts: Post[] = []
    `,
  },
  {
    fileName: 'app/mutations.ts',
    code: `
import { Mutation } from 'overmind'
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
