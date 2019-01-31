export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action } from 'overmind'

let debounce
export const search: Action<Event> = ({ value: event, state, effects }) => {
  state.query = event.currentTarget.value

  if (query.length < 3) return

  if (debounce) clearTimeout(debounce)

  debounce = setTimeout(async () => {
    state.isSearching = true
    state.searchResult = await effects.api.search(state.query)
    state.isSearching = false

    debounce = null
  }, 200)
}
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/state.js',
          code: `
let debounce
export const search = ({ value: event, state, effects }) => {
  state.query = event.currentTarget.value

  if (query.length < 3) return

  if (debounce) clearTimeout(debounce)

  debounce = setTimeout(async () => {
    state.isSearching = true
    state.searchResult = await effects.api.search(state.query)
    state.isSearching = false

    debounce = null
  }, 200)
}
  `,
        },
      ]
