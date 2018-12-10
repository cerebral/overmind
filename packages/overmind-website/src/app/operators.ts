import { mutate, Operator, map, filter } from 'overmind'
import { SearchResult } from './types'

export const getTargetValue: Operator<
  React.ChangeEvent<HTMLInputElement>,
  string
> = map(({ value: event }) => event.currentTarget.value)

export const setQuery: Operator<string, string> = mutate(
  ({ value: query, state }) => {
    state.query = query
    state.showSearchResult = query.length > 2
    state.isLoadingSearchResult = query.length > 2
  }
)

export const isValidQuery: Operator<string, string> = filter(
  ({ value: query }) => query.length >= 3
)

export const query: Operator<string, SearchResult[]> = map(
  ({ state, request }) => request('/backend/search?query=' + state.query)
)

export const setQueryResult: Operator<SearchResult[], any> = mutate(
  ({ value: result, state }) => {
    state.searchResult = result
    state.isLoadingSearchResult = false
  }
)
