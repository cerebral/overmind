import { IContext, Overmind } from './'

describe('Reaction', () => {
  test('should create reaction', () => {
    expect.assertions(2)

    let runCount = 0

    type State = {
      foo: string
    }
    const state: State = {
      foo: 'bar',
    }

    const changeFoo = ({ state }: Context) => {
      state.foo = 'bar2'
    }
    const actions = {
      changeFoo,
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

    app.reaction(
      ({ foo }) => foo,
      (foo) => {
        runCount++
        expect(foo).toBe('bar2')
      }
    )

    app.actions.changeFoo()

    expect(runCount).toBe(1)
  })
  test('should create deep reaction', () => {
    expect.assertions(2)

    let runCount = 0

    type State = {
      foo: {
        bar: string
      }
    }
    const state: State = {
      foo: {
        bar: 'baz',
      },
    }

    const changeFoo = ({ state }: Context) => {
      state.foo.bar = 'baz2'
    }
    const actions = {
      changeFoo,
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

    app.reaction(
      ({ foo }) => foo,
      (foo) => {
        runCount++
        expect(foo.bar).toBe('baz2')
      },
      { nested: true }
    )

    app.actions.changeFoo()

    expect(runCount).toBe(1)
  })
  test('should throw deep reaction when invalid return object', () => {
    expect.assertions(1)

    type State = {
      foo: {
        bar: string
      }
    }
    const state: State = {
      foo: {
        bar: 'baz',
      },
    }

    const changeFoo = ({ state }: Context) => {
      state.foo.bar = 'baz2'
    }
    const actions = {
      changeFoo,
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

    expect(() => {
      app.reaction(
        ({ foo }) => foo.bar,
        (bar) => {
          expect(bar).toBe('baz2')
        },
        { nested: true }
      )
    }).toThrow()
  })
})
