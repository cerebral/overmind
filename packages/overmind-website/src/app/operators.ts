import { action, map, filter } from 'overmind'

export const getTargetValue = map<React.ChangeEvent<HTMLInputElement>, string>(
  ({ value: event }) => event.currentTarget.value
)

export const setQuery = action<string>(({ value: query, state }) => {
  state.query = query
  state.showSearchResult = query.length > 2
  state.isLoadingSearchResult = query.length > 2
})

export const isValidQuery = filter<string>(
  ({ value: query }) => query.length >= 3
)

export const query = action<string>(async ({ state, request }) => {
  state.searchResult = await request('/backend/search?query=' + state.query)
  state.isLoadingSearchResult = false
})
