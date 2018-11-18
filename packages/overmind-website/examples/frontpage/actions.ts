export default () => [
  {
    code: `
export const getItems = async ({ state, request }) => {
  state.isLoadingItems = true
  state.items = await request("/items")
  state.isLoadingItems = false
}
`,
  },
]
