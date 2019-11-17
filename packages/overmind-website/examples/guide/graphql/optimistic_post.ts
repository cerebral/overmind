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

export const addPost: AsyncAction<string> = async ({ state, effects }, title) => {
  const optimisticId = String(Date.now())
  
  state.posts.push({
    id: optimisticId,
    title
  })

  const { id } = await effects.mutations.createPost({ title })
  const optimisticPost = state.posts.find(post => post.id === optimisticId)

  optimisticPost.id = id
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

export const addPost = async ({ state, effects }, title) => {
  const optimisticId = String(Date.now())

  state.posts.push({
    id: optimisticId,
    title
  })

  const { id } = await effects.mutations.createPost({ title })
  const optimisticPost = state.posts.find(post => post.id === optimisticId)

  optimisticPost.id = id
}
`,
        },
      ]
