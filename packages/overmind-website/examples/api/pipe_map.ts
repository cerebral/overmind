export default (ts) =>
  ts
    ? [
        {
          code: `
import { map } from 'overmind'

export const getUser = map(({ api }) => api.getUser())
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
