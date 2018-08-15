export const js = [
  {
    fileName: 'mutations.js',
    code: `
export const setLoadingPosts =
  state => state.isLoadingPosts = true

export const unsetLoadingPosts =
  state => state.isLoadingPosts = false

export const setPosts =
  (state, posts) => state.posts = posts
  `,
  },
]

export const ts = [
  {
    fileName: 'mutations.ts',
    code: `
import { State, Post } from './app'

export function setLoadingPosts (state: State) {
  state.isLoadingPosts = true
}

export function unsetLoadingPosts (state: State) {
  state.isLoadingPosts = false
}

export function setPosts (state: State, posts: Post[]) {
  state.posts = posts
}
  `,
  },
]
