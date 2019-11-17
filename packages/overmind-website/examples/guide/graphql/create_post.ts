export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { AsyncAction } from 'overmind'

export const getPosts: AsyncAction = async ({ state, effects }) => {
  const { posts } = await effects.queries.posts()
  
  state.posts = posts
}

export const addPost: AsyncAction<string> = async ({ effects }, title) => {
  await effects.mutations.createPost({ title })
}
`,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.js',
          code: `
export const getPosts = async ({ state, effects }) => {
  const { posts } = await effects.queries.posts()

  state.posts = posts
}

export const addPost = async ({ effects }, title) => {
  await effects.mutations.createPost({ title })
}
`,
        },
      ]
