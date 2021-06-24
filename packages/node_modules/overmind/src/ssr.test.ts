import { IMutation } from 'proxy-state-tree'

import { Overmind, createOvermindSSR, json, rehydrate, IContext } from './'

describe('Mock', () => {
  test('should allow changing the state', () => {
    type State = {
      foo: string
    }
    const state: State = {
      foo: 'bar',
    }
    const config = {
      state,
    }

    const overmind = createOvermindSSR(config)

    overmind.state.foo = 'bar2'

    expect(overmind.state).toEqual({
      foo: 'bar2',
    })
  })
  test('should return a tree of changes', () => {
    type State = {
      foo: string
    }
    const state: State = {
      foo: 'bar',
    }
    const config = {
      state,
    }

    const overmind = createOvermindSSR(config)

    overmind.state.foo = 'bar2'

    const mutations = overmind.hydrate()
    expect(mutations[0].method).toBe('set')
    expect(mutations[0].path).toBe('foo')
    expect(mutations[0].args).toEqual(['bar2'])
  })
  test('should rehydrate mutation', () => {
    type State = {
      foo: string
    }
    let mutations: IMutation[] = []
    const state: State = {
      foo: 'bar',
    }
    const actions = {
      onInitializeOvermind: ({ state }: Context) => {
        rehydrate(state, mutations)
      },
    }

    const config = {
      actions,
      state,
    }

    type Context = IContext<{
      state: typeof state
    }>

    const overmindSsr = createOvermindSSR(config)

    overmindSsr.state.foo = 'bar2'

    mutations = overmindSsr.hydrate()

    const overmind = new Overmind(config)

    expect(json(overmind.state)).toEqual({
      foo: 'bar2',
    })
  })
})
