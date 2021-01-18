import { PROXY_TREE } from 'proxy-state-tree'

import { EventType, Overmind, derived, IContext } from './'

describe('Derived', () => {
  test('should instantiate app with derived state', () => {
    type State = {
      foo: string
      upperFoo: string
    }
    const state: State = {
      foo: 'bar',
      upperFoo: derived((state: State) => state.foo.toUpperCase()),
    }
    const config = {
      state,
    }

    const app = new Overmind(config)

    expect(app.state.upperFoo).toEqual('BAR')
  })

  test('should dynamically remove derived', async () => {
    let dirtyCount = 0
    const removeDerived = ({ state }: Context) => {
      state.upperFoo = null as any
    }
    const changeFoo = ({ state }: Context, count: number) => {
      state.foo = 'bar' + count
    }
    type State = {
      foo: string
      upperFoo: string
    }
    const state: State = {
      foo: 'bar',
      upperFoo: derived((state: State) => state.foo.toUpperCase()),
    }
    const actions = {
      changeFoo,
      removeDerived,
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
    const trackStateTree = app.getTrackStateTree()
    const onTrack = () => {}
    function render() {
      trackStateTree.track(onTrack)
      app.state.upperFoo
    }
    app.eventHub.on(EventType.DERIVED_DIRTY, () => {
      dirtyCount++
    })
    render()
    expect(app.state.upperFoo).toBe('BAR')
    app.actions.changeFoo(2)
    expect(app.state.upperFoo).toBe('BAR2')
    app.actions.removeDerived()
    app.actions.changeFoo(3)
    // The dirty event is async
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(dirtyCount).toBe(1)
  })

  test('should dynamically add derived', () => {
    const addDerived = ({ state }: Context) => {
      state.upperFoo = derived((state: State) => state.foo.toUpperCase())
    }
    const changeFoo = ({ state }: Context) => {
      state.foo = 'bar2'
    }
    type State = {
      foo: string
      upperFoo: string | null
    }
    const state: State = {
      foo: 'bar',
      upperFoo: null,
    }
    const actions = {
      changeFoo,
      addDerived,
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
    const trackStateTree = app.getTrackStateTree()
    const onTrack = () => {}
    function render() {
      trackStateTree.track(onTrack)
      app.state.upperFoo
    }
    render()
    app.actions.addDerived()
    expect(app.state.upperFoo).toBe('BAR')
    app.actions.changeFoo()
    expect(app.state.upperFoo).toBe('BAR2')
  })

  test('should allow access to proxy state tree to continue tracking with derived function', () => {
    let renderCount = 0
    const changeFoo = ({ state }: Context) => {
      state.foo = 'bar2'
    }
    type State = {
      foo: string
      upperFoo: () => string
    }
    const state: State = {
      foo: 'bar',
      upperFoo: derived(
        () =>
          function() {
            const state = this[PROXY_TREE].state

            return state.foo.toUpperCase()
          }
      ),
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
    const trackStateTree = app.getTrackStateTree()
    const onTrack = () => {
      renderCount++
    }
    function render() {
      trackStateTree.track(onTrack)
      app.state.upperFoo()
    }
    render()
    app.actions.changeFoo()
    expect(renderCount).toBe(1)
  })

  test('should track derived state', () => {
    let renderCount = 0
    const changeFoo = ({ state }: Context) => {
      state.foo = 'bar2'
    }
    type State = {
      foo: string
      upperFoo: string
    }
    const state: State = {
      foo: 'bar',
      upperFoo: derived((state: State) => state.foo.toUpperCase()),
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
      upperFoo: string
    }
    const state: State = {
      foo: 'bar',
      upperFoo: derived((state: State) => state.foo.toUpperCase()),
    }
    const changeFoo = ({ state }: Context) => {
      state.foo = 'bar2'
      expect(state.upperFoo).toBe('BAR2')
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

    app.actions.changeFoo()
  })
  test('should pass parent as second argument', () => {
    expect.assertions(1)
    const changeFoo = ({ state }: Context) => {
      state.foo = 'bar2'
      expect(state.upperFoo).toBe('BAR2')
    }

    type State = {
      foo: string
      upperFoo: string
    }

    const state: State = {
      foo: 'bar',
      upperFoo: derived((_, parent: State) => parent.foo.toUpperCase()),
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

    app.actions.changeFoo()
  })
  test('should track nested derived correctly', () => {
    expect.assertions(4)
    let runCount = 0
    const changeFoo = ({ state }: Context) => {
      state.nestedDerived.foo = 'bar2'
      expect(state.nestedDerived.upperFoo).toBe('BAR2')
    }

    type State = {
      nestedDerived: {
        foo: string
        upperFoo: string
      }
    }

    const state: State = {
      nestedDerived: {
        foo: 'bar',
        upperFoo: derived((parent: State['nestedDerived']) =>
          parent.foo.toUpperCase()
        ),
      },
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

    const trackStateTree = app.getTrackStateTree()

    function render() {
      runCount++
      if (runCount === 1) {
        expect(trackStateTree.state.nestedDerived.upperFoo).toBe('BAR')
      } else {
        expect(trackStateTree.state.nestedDerived.upperFoo).toBe('BAR2')
      }
      trackStateTree.stopTracking()
    }

    trackStateTree.track(render)

    render()

    app.actions.changeFoo()

    expect(runCount).toBe(2)
  })
  test('should be able to add derived to class instances', () => {
    class SomeClass {
      foo = derived((state: SomeClass) => state.bar + '!')
      bar = 'foo'
    }
    type State = {
      class: SomeClass
    }
    const state: State = {
      class: new SomeClass(),
    }
    const config = {
      state,
    }

    const app = new Overmind(config)

    expect(app.state.class.foo).toEqual('foo!')
  })
})
