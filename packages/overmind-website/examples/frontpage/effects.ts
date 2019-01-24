export default () => [
  {
    code: `
export const api = {
  fetchItems: async () => {
    const response = await fetch('/api/items')

    return response.json()
  }
}
`,
  },
]
