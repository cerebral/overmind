export default (ts) =>
  ts
    ? [
        {
          code: `
const MyComponent: Component = ({ actions }) => {
  return (
    <button onClick={actions.doAwesomeStuff}>
      Do awesome stuff!
    </button>
  )
}
`,
        },
      ]
    : [
        {
          code: `
const MyComponent = ({ actions }) => {
  return (
    <button onClick={actions.doAwesomeStuff}>
      Do awesome stuff!
    </button>
  )
}
`,
        },
      ]
