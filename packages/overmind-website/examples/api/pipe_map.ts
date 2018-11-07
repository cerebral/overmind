export default (ts) =>
  ts
    ? [
        {
          code: `
import { map } from 'overmind'
import { User } from './state'

export const getUser = map<string, User>(({ api }) => api.getUser())
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
