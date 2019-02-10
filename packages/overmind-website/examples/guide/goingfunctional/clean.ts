export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Operator, pipe, debounce, action } from 'overmind'
import { getEventTargetValue, lengthGreaterThan } from './operators'

export const search: Operator<Event> = pipe(
  getEventTargetValue,
  lengthGreaterThan(2),
  debounce(200),
  action(async ({ state, effects }, query) => {
    state.isSearching = true
    state.searchResult = await effects.api.search(query)
    state.isSearching = false
  })
)
  `,
        },
        {
          fileName: 'overmind/operators.ts',
          code: `
import { Operator, map, filter } from 'overmind'

const getEventTargetValue: Operator<Event, string> =
  map((_, value) => value.currentTarget.value)

const lengthGreaterThan: (length: number) => Operator<string> =
  (length) => filter((_, value) => value.length > length)
    
        `,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.js',
          code: `
import { pipe, debounce, action } from 'overmind'
import { getEventTargetValue, lengthGreaterThan } from './operators'

export const search = pipe(
  getEventTargetValue,
  lengthGreaterThan(2),
  debounce(200),
  action(async ({ state, effects }, query) => {
    state.isSearching = true
    state.searchResult = await effects.api.search(query)
    state.isSearching = false
  })
)
  `,
        },
        {
          fileName: 'overmind/operators.js',
          code: `
import { map, filter } from 'overmind'

export const getEventTargetValue = map((_, value) => value.currentTarget.value)

export const lengthGreaterThan = (length) => filter((_, value) => value.length > length)
        `,
        },
      ]
