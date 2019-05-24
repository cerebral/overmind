export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/posts/internalActions.ts',
          code: `
import { Action } from 'overmind'

export const handleError: Action = () => {}
`,
        },
        {
          fileName: 'overmind/posts/actions.ts',
          code: `
import { AsyncAction } from 'overmind'
import * as internalActions from './internalActions'

export const internal = internalActions

export const getPosts: AsyncAction = async () => {}

export const addNewPost: AsyncAction = async () => {}
`,
        },
        {
          fileName: 'overmind/admin/actions.ts',
          code: `
import { AsyncAction } from 'overmind'

export const getUsers: AsyncAction = async () => {}

export const changeUserAccess: AsyncAction = async () => {}
`,
        },
      ]
    : [
        {
          fileName: 'overmind/posts/internalActions.js',
          code: `
export const handleError = () => {}
`,
        },
        {
          fileName: 'overmind/posts/actions.js',
          code: `
import * as internalActions from './internalActions'

export const internal = internalActions

export const getPosts = async () => {}

export const addNewPost = async () => {}
`,
        },
        {
          fileName: 'overmind/admin/actions.js',
          code: `
export const getUsers = async () => {}

export const changeUserAccess = async () => {}
`,
        },
      ]
