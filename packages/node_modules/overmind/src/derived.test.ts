import { Overmind, IAction, IDerive, TStateObject } from './'

type State = {
  foo: string
  upperFoo: string
}

describe('Derived', () => {
  test('should instantiate app with derived state', () => {
    type State = {
      foo: string
      upperFoo: Derive<State, string>
    }
    const state: State = {
      foo: 'bar',
      upperFoo: (state) => state.foo.toUpperCase(),
    }
    const config = {
      state,
    }

    type Config = typeof config

    interface Derive<Parent extends TStateObject, Value>
      extends IDerive<Config, Parent, Value> {}

    const app = new Overmind(config)

    expect(app.state.upperFoo).toEqual('BAR')
  })

  test('should track derived state', () => {
    let renderCount = 0
    const changeFoo: Action = ({ state }) => (state.foo = 'bar2')
    type State = {
      foo: string
      upperFoo: Derive<State, string>
    }
    const state: State = {
      foo: 'bar',
      upperFoo: (state) => state.foo.toUpperCase(),
    }

    const config = {
      state,
      actions: {
        changeFoo,
      },
    }
    type Config = {
      state: {
        foo: string
        upperFoo: string
      }
      actions: typeof config.actions
    }
    interface Action<Input = void> extends IAction<Config, Input> {}
    interface Derive<Parent extends TStateObject, Value>
      extends IDerive<Config, Parent, Value> {}

    const app = new Overmind(config)
    const trackStateTree = app.getTrackStateTree()
    const onTrack = () => {
      renderCount++
    }
    function render() {
      trackStateTree.track(onTrack)
      app.state.upperFoo
    }
    render()
    app.actions.changeFoo()
    expect(app.state.upperFoo).toBe('BAR2')
    expect(renderCount).toBe(1)
  })

  test('should not require flush to flag as dirty', () => {
    expect.assertions(1)
    type State = {
      foo: string
      upperFoo: Derive<State, string>
    }
    const state: State = {
      foo: 'bar',
      upperFoo: (state) => state.foo.toUpperCase(),
    }
    const changeFoo: Action = ({ state }) => {
      state.foo = 'bar2'
      expect(state.upperFoo).toBe('BAR2')
    }

    const config = {
      state,
      actions: {
        changeFoo,
      },
    }
    type Config = typeof config
    interface Action<Input = void> extends IAction<Config, Input> {}
    interface Derive<Parent extends TStateObject, Value>
      extends IDerive<Config, Parent, Value> {}

    const app = new Overmind(config)

    app.actions.changeFoo()
  })
  test('should pass parent as second argument', () => {
    expect.assertions(1)
    const changeFoo: Action = ({ state }) => {
      state.foo = 'bar2'
      expect(state.upperFoo).toBe('BAR2')
    }

    const derived: Derive<State, string> = (_, parent) =>
      parent.foo.toUpperCase()

    const config = {
      state: {
        foo: 'bar',
        upperFoo: derived,
      },
      actions: {
        changeFoo,
      },
    }
    type Config = typeof config
    interface Action<Input = void> extends IAction<Config, Input> {}
    interface Derive<Parent extends TStateObject, Value>
      extends IDerive<Config, Parent, Value> {}

    const app = new Overmind(config)

    app.actions.changeFoo()
  })
})
