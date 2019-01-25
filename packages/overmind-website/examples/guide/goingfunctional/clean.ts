export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action, fromOperator, pipe, debounce, action } from 'overmind'
import { getEventTargetValue, lengthGreaterThan } from './operators'

export const search: Action<Event> = fromOperator(
  pipe(
    getEventTargetValue,
    lengthGreaterThan(2),
    debounce(200),
    action(async ({ value: query, state, effects }) => {
      state.isSearching = true
      state.searchResult = await effects.api.search(query)
      state.isSearching = false
    })
  )
)
  `,
        },
        {
          fileName: 'overmind/operators.ts',
          code: `
import { Operator, map, filter } from 'overmind'

const getEventTargetValue: Operator<Event, string> =
  map(({ value }) => value.currentTarget.value)

const lengthGreaterThan: (length: number) => Operator<string> =
  (length) => filter(({ value }) => value.length > length)
    
        `,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.js',
          code: `
import { fromOperator, pipe, debounce, action } from 'overmind'
import { getEventTargetValue, lengthGreaterThan } from './operators'

export const search = fromOperator(
  pipe(
    getEventTargetValue,
    lengthGreaterThan(2),
    debounce(200),
    action(async ({ value: query, state, effects }) => {
      state.isSearching = true
      state.searchResult = await effects.api.search(query)
      state.isSearching = false
    })
  )
)
  `,
        },
        {
          fileName: 'overmind/operators.js',
          code: `
import { map, filter } from 'overmind'

export const getEventTargetValue = map(({ value }) => value.currentTarget.value)

export const lengthGreaterThan = (length) => filter(({ value }) => value.length > length)
        `,
        },
      ]
