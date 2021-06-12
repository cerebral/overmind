import { IContext, createOvermind, createOvermindMock } from './'
import { statemachine } from './statemachine'

describe('Statemachine', () => {
  test('should set initial state', () => {
    type States =
      | {
          current: 'FOO'
        }
      | {
          current: 'BAR'
        }

    const state = statemachine<States, { type: 'TEST' }>({
      FOO: {},
      BAR: {},
    }).create({
      current: 'FOO',
    })

    const config = {
      state,
    }

    const overmind = createOvermindMock(config)

    expect(overmind.state.current).toBe('FOO')
  })

  test('should set base state', () => {
    type States =
      | {
          current: 'FOO'
        }
      | {
          current: 'BAR'
        }

    type BaseState = {
      foo: string
    }

    const state = statemachine<States, { type: 'TEST' }, BaseState>({
      FOO: {},
      BAR: {},
    }).create(
      {
        current: 'FOO',
      },
      {
        foo: 'bar',
      }
    )

    const config = {
      state,
    }

    const overmind = createOvermindMock(config)

    expect(overmind.state.current).toBe('FOO')
    expect(overmind.state.foo).toBe('bar')
  })

  test('should transition state using function', () => {
    type States =
      | {
          current: 'FOO'
        }
      | {
          current: 'BAR'
        }

    type Events = {
      type: 'TOGGLE'
    }

    const state = statemachine<States, Events>((_, state) => {
      return { current: state.current === 'FOO' ? 'BAR' : 'FOO' }
    }).create({
      current: 'FOO',
    })
    const transition = ({ state }: Context) => {
      state.send('TOGGLE')
    }
    const actions = {
      transition,
    }
    const config = {
      state,
      actions,
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>

    const overmind = createOvermindMock(config)

    overmind.actions.transition()
    expect(overmind.state.current).toBe('BAR')
  })

  test('should remove state when transitioning', () => {
    type States =
      | {
          current: 'FOO'
          foo: string
        }
      | {
          current: 'BAR'
        }

    type Events = {
      type: 'TOGGLE'
    }

    const state = statemachine<States, Events>({
      FOO: {
        TOGGLE: () => ({ current: 'BAR' }),
      },
      BAR: {
        TOGGLE: () => ({ current: 'FOO', foo: 'foo' }),
      },
    }).create({
      current: 'FOO',
      foo: 'bar',
    })
    const transition = ({ state }: Context) => {
      state.send('TOGGLE')
    }
    const actions = {
      transition,
    }
    const config = {
      state,
      actions,
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>

    const overmind = createOvermindMock(config)

    const fooContext = overmind.state.matches('FOO')
    expect(overmind.state.current).toBe('FOO')
    expect(fooContext && fooContext.foo).toBe('bar')
    overmind.actions.transition()
    expect(overmind.state.current).toBe('BAR')
    expect((overmind.state as any).foo).toBe(undefined)
  })

  test('should block mutations in strict mode', () => {
    type States =
      | {
          current: 'FOO'
          foo: string
        }
      | {
          current: 'BAR'
        }

    type Events = {
      type: 'TOGGLE'
    }

    const state = statemachine<States, Events>((_, state) => {
      if (state.current === 'FOO') {
        return { current: 'BAR' }
      }

      return { current: 'FOO', foo: 'bar' }
    }).create({
      current: 'FOO',
      foo: 'bar',
    })
    const transition = ({ state }: Context) => {
      const fooState = state.matches('FOO')
      if (fooState) {
        fooState.foo = 'bar2'
      }
    }
    const actions = {
      transition,
    }
    const config = {
      state,
      actions,
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>

    const overmind = createOvermind(config, {
      devtools: false,
      strict: true,
      devEnv: 'test',
    })

    expect(() => overmind.actions.transition()).toThrow()
  })

  test('should ignore transition when no state returned', () => {
    type States =
      | {
          current: 'FOO'
        }
      | {
          current: 'BAR'
        }

    type Events = {
      type: 'TOGGLE'
    }

    const state = statemachine<States, Events>({
      FOO: {
        TOGGLE: () => {},
      },
      BAR: {
        TOGGLE: () => {},
      },
    }).create({
      current: 'FOO',
    })
    const transition = ({ state }: Context) => {
      state.send('TOGGLE')
    }
    const actions = {
      transition,
    }

    const config = {
      state,
      actions,
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>

    const overmind = createOvermindMock(config)
    overmind.actions.transition()
    expect(overmind.state.current).toBe('FOO')
  })

  test('should flush changes to transitions', () => {
    expect.assertions(1)

    type States =
      | {
          current: 'FOO'
        }
      | {
          current: 'BAR'
        }

    type Events = {
      type: 'TOGGLE'
    }

    const state = statemachine<States, Events>({
      FOO: {
        TOGGLE: () => ({ current: 'BAR' }),
      },
      BAR: {},
    }).create({
      current: 'FOO',
    })

    const transition = ({ state }: Context) => {
      state.send('TOGGLE')
    }
    const actions = {
      transition,
    }
    const config = {
      state,
      actions,
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>

    const overmind = createOvermind(config)
    overmind.reaction(
      (state) => state.current,
      (value) => {
        expect(value).toEqual('BAR')
      }
    )
    overmind.actions.transition()
  })

  test('should make copy of statemachine during tests', () => {
    type States =
      | {
          current: 'FOO'
          obj: {
            foo: string
          }
        }
      | {
          current: 'BAR'
          obj: {
            foo: string
          }
        }

    const state = statemachine<States, { type: 'TEST' }>({
      FOO: {
        TEST: () => {},
      },
      BAR: {
        TEST: () => {},
      },
    }).create({
      current: 'FOO',
      obj: {
        foo: 'bar',
      },
    })

    const config = {
      state,
      actions: {
        changeFoo({ state }) {
          state.obj.foo = 'bar2'
        },
      },
    }

    const overmind = createOvermindMock(config)

    // @ts-ignore
    overmind.actions.changeFoo()

    expect(overmind.state.obj.foo).toBe('bar2')

    const overmind2 = createOvermindMock(config)

    expect(overmind2.state.obj.foo).toBe('bar')
  })
  test('should allow listening to state changes', () => {
    expect.assertions(1)

    type States =
      | {
          current: 'FOO'
        }
      | {
          current: 'BAR'
        }

    type Events = {
      type: 'TOGGLE'
    }

    const state = statemachine<States, Events>({
      FOO: {
        TOGGLE: () => ({ current: 'BAR' }),
      },
      BAR: {},
    }).create({
      current: 'FOO',
    })

    const transition = ({ state }: Context) => {
      state.onTransition((state) => expect(state.current).toBe('BAR'))
      state.send('TOGGLE')
    }
    const actions = {
      transition,
    }
    const config = {
      state,
      actions,
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>

    const overmind = createOvermind(config)

    overmind.actions.transition()
  })
})
