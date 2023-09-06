import { Overmind, createOvermindMock, IContext } from 'overmind'
import * as React from 'react'
import { render, act } from '@testing-library/react'

import '@testing-library/jest-dom'

import { Provider, createStateHook } from './'

describe('React', () => {
  test('should allow using hooks', () => {
    let renderCount = 0

    const doThis = ({ state }: Context) => {
      state.foo = 'bar2'
    }
    const state = {
      foo: 'bar',
    }
    const actions = {
      doThis,
    }
    const config = {
      state,
      actions,
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>

    const app = new Overmind(config)

    const useState = createStateHook<Context>()

    const FooComponent: React.FunctionComponent = () => {
      const state = useState()
      renderCount++

      return <h1>{state.foo}</h1>
    }

    const { container } = render(
      <Provider value={app}>
        <FooComponent />
      </Provider>
    )

    expect(renderCount).toBe(1)

    act(() => {
      app.actions.doThis()
    })

    expect(renderCount).toBe(2)
    expect(container).toMatchSnapshot()
  })

  test('should allow using hooks with scoped tracking', () => {
    let renderCount = 0

    const doThis = ({ state }: Context) => {
      state.foo.push({ foo: 'bar2' })
    }
    const doThat = ({ state }: Context) => {
      state.foo[0].foo = 'bar3'
    }
    const state = {
      foo: [{ foo: 'bar' }],
    }
    const actions = {
      doThis,
      doThat,
    }
    const config = {
      state,
      actions,
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>

    const app = new Overmind(config)

    const useState = createStateHook<Context>()

    const FooComponent: React.FunctionComponent = () => {
      const state = useState((state) => state.foo[0])
      renderCount++

      return <h1>{state.foo}</h1>
    }

    const { container } = render(
      <Provider value={app}>
        <FooComponent />
      </Provider>
    )

    expect(renderCount).toBe(1)

    act(() => {
      app.actions.doThis()
    })

    expect(renderCount).toBe(1)

    act(() => {
      app.actions.doThat()
    })
    expect(renderCount).toBe(2)

    // This is not showing the expected result, but logging the rendering does, so must be the
    // library messing it up
    expect(container).toMatchSnapshot()
  })
  test('should allow using mocked Overmind', () => {
    let renderCount = 0

    const doThis = ({ state }: Context) => {
      state.foo = 'bar2'
    }
    const state = {
      foo: 'bar',
    }
    const actions = {
      doThis,
    }
    const config = {
      state,
      actions,
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>
    const useState = createStateHook<Context>()

    const FooComponent: React.FunctionComponent = () => {
      const state = useState()
      renderCount++

      return <h1>{state.foo}</h1>
    }

    const mock = createOvermindMock(config)
    const { container } = render(
      <Provider value={mock}>
        <FooComponent />
      </Provider>
    )

    expect(renderCount).toBe(1)
    expect(container).toMatchSnapshot()
  })
  test('should throw an error without provider', () => {
    expect.assertions(1)

    const useState = createStateHook()

    const FooComponent = () => {
      const state = useState()

      return <h1>{(state as any).foo}</h1>
    }

    expect(() => {
      render(<FooComponent />)
    }).toThrow(Error)
  })
})
