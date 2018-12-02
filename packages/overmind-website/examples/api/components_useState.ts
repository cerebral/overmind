export default (ts) =>
  ts
    ? [
        {
          code: `
import { h, Component, useState } from 'overmind-components'

const MyComponent: Component = () => {
  const [shout, setShout] = useState(false)

  function onClick () {
    setShout(!shout)
  }

  return (
    <h1 onClick={onClick}>
      {shout ? 'HELLO' : 'hello'}
    </h1>
  )
}
`,
        },
      ]
    : [
        {
          code: `
import { h, useState } from 'overmind-components'

const MyComponent = () => {
  const [shout, setShout] = useState(false)

  function onClick () {
    setShout(!shout)
  }

  return (
    <h1 onClick={onClick}>
      {shout ? 'HELLO' : 'hello'}
    </h1>
  )
}
`,
        },
      ]
