export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/posts/actions.ts',
          code: `
import { Action } from 'overmind'

export const getPosts: Action = () => {}

export const addNewPost: Action = () => {}
`,
        },
        {
          fileName: 'overmind/admin/actions.ts',
          code: `
import { Action } from 'overmind'

export const getUsers: Action = () => {}

export const changeUserAccess: Action = () => {}
`,
        },
      ]
    : [
        {
          fileName: 'overmind/posts/actions.js',
          code: `
export const getPosts = () => {}

export const addNewPost = () => {}
`,
        },
        {
          fileName: 'overmind/admin/actions.js',
          code: `
export const getUsers = () => {}

export const changeUserAccess = () => {}
`,
        },
      ]
