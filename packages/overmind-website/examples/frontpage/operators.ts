export default () => [
  {
    code: `
export const search = pipe(
  mutate(({ state }, query) => {
    state.query = query
  }),
  filter((_, query) => query.length > 2),
  debounce(200),
  mutate(async ({ state, effects }, query) => {
    state.isSearching = true
    state.searchResult = await effects.getSearchResult(query)
    state.isSearching = false
  })
)
`,
  },
]
