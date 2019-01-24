export default () => [
  {
    code: `
export const getItems = async ({ state, effects }) => {
  state.isLoadingItems = true
  state.items = await effects.api.fetchItems()
  state.isLoadingItems = false
}
`,
  },
]
