export default (ts) =>
  ts
    ? [
        {
          fileName: 'operators.ts',
          code: `
import { Operator, map } from 'overmind'
import { User } from './state'

export const getEventTargetValue: () => Operator<Event, string> = () =>
  map(function getEventTargetValue(_, event) {
    return event.currentTarget.value
  })
`,
        },
      ]
    : [
        {
          fileName: 'operators.js',
          code: `
import { map } from 'overmind'

export const getEventTargetValue = () => 
  map(function getEventTargetValue(_, event) {
    return event.currentTarget.value
  })
`,
        },
      ]
