export default () => [
  {
    code: `
export const api = {
  async fetchItems() {
    const response = await fetch('/api/items')

    return response.json()
  }
}
`,
  },
]
