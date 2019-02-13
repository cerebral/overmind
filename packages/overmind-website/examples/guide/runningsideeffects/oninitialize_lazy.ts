export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/onInitialize.ts',
          code: `
import { OnInitialize } from 'overmind'

export const onInitialize: OnInitialize = async ({ effects }) => {
  await effects.api.initialize()
  state.posts = await effects.api.getPosts()
}
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/onInitialize.js',
          code: `
export const onInitialize = async ({ state, effects }) => {
  await effects.api.initialize()
  state.posts = await effects.api.getPosts()
}
  `,
        },
      ]
