export default (ts) =>
  ts
    ? [
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
import { Mutate } from 'overmind'
import { Post } from './state'

export const setLoadingPosts: Mutate = state =>
  state.isLoadingPosts = true

export const unsetLoadingPosts: Mutate = state =>
  state.isLoadingPosts = false

export const setPosts: Mutate<Post[]> = (state, posts) =>
  state.posts = posts
  `,
        },
      ]
    : [
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
