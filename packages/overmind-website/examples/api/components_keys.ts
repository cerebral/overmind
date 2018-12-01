export default (ts) =>
  ts
    ? [
        {
          code: `
const Items: Component = ({ state }) => {
  return (
    <ul>
      {state.items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}
`,
        },
      ]
    : [
        {
          code: `
const Items = ({ state }) => {
  return (
    <ul>
      {state.items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}
`,
        },
      ]
