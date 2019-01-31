export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/operators.ts',
          code: `
import { Operator, action } from 'overmind'

export const getPosts: Operator = action(async ({ state, effects }) => {
  state.posts = await effects.api.getPosts()
})

export const getUsers: Operator = action(async ({ state, effects }) => {
  state.users = await effects.api.getUsers()
})
`,
        },
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Operator, parallel } from 'overmind'
import { getPosts, getUsers } from './operators'

export const grabData: Operator = parallel(
  getPosts,
  getUsers
) 
          `,
        },
      ]
    : [
        {
          fileName: 'overmind/operators.js',
          code: `
import { action } from 'overmind'

export const getPosts = action(async ({ state, effects }) => {
  state.posts = await effects.api.getPosts()
})

export const getUsers = action(async ({ state, effects }) => {
  state.users = await effects.api.getUsers()
})
`,
        },
        {
          fileName: 'overmind/actions.js',
          code: `
import { parallel } from 'overmind'
import { getPosts, getUsers } from './operators'

export const grabData = parallel(
  getPosts,
  getUsers
)  
        `,
        },
      ]
