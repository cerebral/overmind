export default (ts) =>
  ts
    ? [
        {
          code: `
import { map } from 'overmind'
import { User } from './state'

export const getEventTargetValue = map<Event, string>(({ value: event }) => event.currentTarget.value)
`,
        },
      ]
    : [
        {
          code: `
import { map } from 'overmind'

export const getEventTargetValue = map(({ value: event }) => event.currentTarget.value)
`,
        },
      ]
