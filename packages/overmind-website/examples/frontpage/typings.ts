export default () => [
  {
    code: `
export const getItems: Action = ({ state }) => {
  state.title = true // TS Error: Should be string
}
`,
  },
]
