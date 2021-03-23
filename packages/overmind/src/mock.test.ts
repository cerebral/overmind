import { IContext, createOvermindMock } from './'

describe('Mock', () => {
  test('should run action tests', () => {
    type State = {
      foo: string
    }
    const state: State = {
      foo: 'bar',
    }
    const test = ({ state, effects }: Context) => {
      state.foo = effects.effect('bar2')
    }
    const actions = { test }
    const effect = (arg: string) => arg
    const effects = { effect }
    const config = {
      state,
      actions,
      effects,
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
      effects: typeof effects
    }>

    const overmind = createOvermindMock(config, {
      effect(arg) {
        return arg + '!!!'
      },
    })

    overmind.actions.test()

    expect(overmind.mutations).toEqual([
      {
        method: 'set',
        path: 'foo',
        args: ['bar2!!!'],
        hasChangedValue: true,
        delimiter: '.',
      },
    ])
  })
  test('should test onInitialize explicitly', () => {
    type State = {
      foo: string
    }
    const state: State = {
      foo: 'bar',
    }
    const onInitializeOvermind = ({ state }: Context) => {
      state.foo += '!'
    }

    const actions = {
      onInitializeOvermind,
    }

    const config = {
      actions,
      state,
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>

    const overmind = createOvermindMock(config, {
      effect() {
        return 'bar3'
      },
    })

    overmind.onInitialize()

    expect(overmind.mutations).toEqual([
      {
        method: 'set',
        path: 'foo',
        args: ['bar!'],
        hasChangedValue: true,
        delimiter: '.',
      },
    ])
  })
  test('should preserve getters', async (done) => {
    expect.assertions(1)
    const state = {
      value: 0,
      get valuePlusTwo() {
        return this.value + 2
      },
    }
    const updateValue = (context: Context) => {
      context.state.value = 15
    }
    const actions = { updateValue }
    const config = { state, actions }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>

    const mock = createOvermindMock(config)
    await mock.actions.updateValue()
    expect(mock.state.valuePlusTwo).toEqual(17)
    done()
  })
  test('should allow setting initial state', async () => {
    expect.assertions(1)
    const state = {
      value: 0,
    }
    const config = { state }

    const mock = createOvermindMock(config, (state) => {
      state.value = 1
    })
    expect(mock.state.value).toBe(1)
  })
  test('should allow setting initial and mock effect', async () => {
    expect.assertions(2)
    const state = {
      value: 0,
    }
    const config = {
      state,
      actions: {
        runFoo({ effects }) {
          return effects.foo()
        },
      },
      effects: {
        foo() {
          return 'bar'
        },
      },
    }

    const mock = createOvermindMock(
      config,
      {
        foo() {
          return 'bar2'
        },
      },
      (state) => {
        state.value = 1
      }
    )
    expect(mock.state.value).toBe(1)
    expect(mock.actions.runFoo()).toBe('bar2')
  })
})
