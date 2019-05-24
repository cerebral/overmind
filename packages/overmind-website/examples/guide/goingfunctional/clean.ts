export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Operator, pipe, debounce, mutate, filter } from 'overmind'

export const search: Operator<string> = pipe(
  mutate(({ state }, value) => {
    state.query = value
  }),
  filter(({ state }) => state.query.length > 2),
  debounce(200),
  mutate(({ state, effects }) => {
    state.isSearching = true
    state.searchResult = await effects.api.search(state.query)
    state.isSearching = false
  })
)
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/actions.js',
          code: `
import { pipe, debounce, mutate, filter } from 'overmind'

export const search = pipe(
  mutate(({ state }, value) => {
    state.query = value
  }),
  filter(({ state }) => state.query.length > 2),
  debounce(200),
  mutate(({ state, effects }) => {
    state.isSearching = true
    state.searchResult = await effects.api.search(state.query)
    state.isSearching = false
  })
)
  `,
        },
      ]
