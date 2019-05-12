export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/operators.ts',
          code: `
import { Operator, filter, mutate } from 'overmind'

export const setQuery: () => Operator<string> = () =>
  mutate(function setQuery({ state }, query) {
    state.query = query
  })

export const lengthGreaterThan: (length: number) => Operator<string> = (length) =>
  filter(function lengthGreaterThan(_, value) {
    return value.length > length
  })

export const getSearchResult: () => Operator<string> = () => 
  mutate(async function getSearchResult({ state, effects }, query) {
    state.isSearching = true
    state.searchResult = await effects.api.search(query)
    state.isSearching = false
  })
    `,
        },
      ]
    : [
        {
          fileName: 'overmind/operators.ts',
          code: `
import { filter, mutate } from 'overmind'

export const setQuery = () =>
  mutate(function setQuery({ state }, query) {
    state.query = query
  })

export const lengthGreaterThan = (length) =>
  filter(function lengthGreaterThan(_, value) {
    return value.length > length
  })

export const getSearchResult = () => 
  mutate(async function getSearchResult({ state, effects }, query) {
    state.isSearching = true
    state.searchResult = await effects.api.search(query)
    state.isSearching = false
  })
  `,
        },
      ]
