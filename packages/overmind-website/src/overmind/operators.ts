import { action, map, filter, Operator } from 'overmind'

export const getTargetValue: Operator<
  React.ChangeEvent<HTMLInputElement>,
  string
> = map(({ value: event }) => event.currentTarget.value)

export const setQuery: Operator<string> = action(({ value: query, state }) => {
  state.query = query
  state.showSearchResult = query.length > 2
  state.isLoadingSearchResult = query.length > 2
})

export const isValidQuery: Operator<string> = filter(
  ({ value: query }) => query.length >= 3
)

export const query: Operator<string> = action(async ({ state, request }) => {
  state.searchResult = await request('/backend/search?query=' + state.query)
  state.isLoadingSearchResult = false
})
