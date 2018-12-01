export default (ts) =>
  ts
    ? [
        {
          code: `
const MyComponent: Component = ({ state, actions }) => {
  return (
    <input
      value={state.inputValue}
      onInput={event => actions.changeInputValue(event.currentTarget.value)}
    />
  )
}
`,
        },
      ]
    : [
        {
          code: `
const MyComponent = ({ state, actions }) => {
  return (
    <input
      value={state.inputValue}
      onInput={event => actions.changeInputValue(event.currentTarget.value)}
    />
  )
}
`,
        },
      ]
