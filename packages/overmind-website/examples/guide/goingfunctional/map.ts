export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/operators.ts',
          code: `
import { Operator, map } from 'overmind'

export const getTargetValue: Operator<Event, string> = map(({ value : event }) => 
  event.currentTarget.value
)
  `,
        },
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Operator, pipe, action } from 'overmind'
import { getTargetValue } from './operators'

export const setValue: Operator<Event, string> = pipe(
  getTargetValue,
  action(({ state, value }) => {
    state.value = value
  })
)
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/operators.js',
          code: `
import { map } from 'overmind'

export const getTargetValue = map(({ value : event }) => 
  event.currentTarget.value
)
`,
        },
        {
          fileName: 'overmind/actions.js',
          code: `
import { pipe, action } from 'overmind'
import { getTargetValue } from './operators'

export const setValue = pipe(
  getTargetValue,
  action(({ state, value }) => {
    state.value = value
  })
)
`,
        },
      ]
