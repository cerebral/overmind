export default (ts) =>
  ts
    ? [
        {
          code: `
import { map } from 'overmind'
import { User } from './state'

export const getUser = map<any, User>(({ api }) => api.getUser())
`,
        },
      ]
    : [
        {
          code: `
import { map } from 'overmind'

export const getUser = map(({ api }) => api.getUser())
`,
        },
      ]
