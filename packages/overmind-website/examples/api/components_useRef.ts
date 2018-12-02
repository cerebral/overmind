export default (ts) =>
  ts
    ? [
        {
          code: `
import { h, Component, useRef, useEffect } from 'overmind-components'

const MyComponent: Component = () => {
  const el = useRef()

  useEffect(() => {
    setTimeout(() => {
      el.current.style.opacity = '1'
    }, 500)
  }, [])

  return <h1 ref={el}>Hello</h1>
}
`,
        },
      ]
    : [
        {
          code: `
import { h, useRef, useEffect } from 'overmind-components'

const MyComponent = () => {
  const el = useRef()

  useEffect(() => {
    setTimeout(() => {
      el.current.style.opacity = '1'
    }, 500)
  }, [])

  return <h1 ref={el}>Hello</h1>
}
`,
        },
      ]
