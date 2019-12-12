export default (ts) =>
  ts
    ? [
        {
          code: `
import { AsyncAction } from 'overmind'

export const getPosts: ({state, actions, effects}: { state: any; actions: any; effects: any }) => Promise<void> = async ({ state, actions, effects }) => {
  state.isLoadingPosts = true
  state.posts = await effects.api.getPosts()
  state.isLoadingPosts = false
}
`,
        },
      ]
    : [
        {
          code: `
export const getPosts = async ({ state, effects }) => {
  state.isLoadingPosts = true
  state.posts = await effects.api.getPosts()
  state.isLoadingPosts = false
}
`,
        },
      ]
