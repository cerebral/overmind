export default (ts) =>
  ts
    ? [
        {
          code: `
import { Operator, map } from 'overmind'
import { User } from './state'

export const getEventTargetValue: Operator<Event, string> = map(({ value: event }) => event.currentTarget.value)
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
