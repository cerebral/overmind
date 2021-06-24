import { Overmind, createOvermindMock } from '../'
import { lazy, merge, namespaced } from './'

describe('Config', () => {
  test('should merge configs', () => {
    const configA = {
      state: {
        foo: 'bar',
      },
    }
    const configB = {
      state: {
        bar: 'baz',
      },
    }
    const merged = merge(configA, configB)

    expect(merged.state.foo).toEqual('bar')
    expect(merged.state.bar).toEqual('baz')
  })

  test('should namespace', () => {
    const configA = {
      state: {
        foo: 'bar',
      },
    }
    const configB = {
      state: {
        bar: 'baz',
      },
    }
    const merged = namespaced({ configA, configB })
    expect(merged.state.configA.foo).toEqual('bar')
    expect(merged.state.configB.bar).toEqual('baz')
  })

  test('should create lazy config', () => {
    const configA = () =>
      Promise.resolve({
        state: {
          foo: 'bar',
        },
        actions: {
          returnStateFromB({ state }) {
            return state.configB.bar
          },
        },
      })
    const configB = () =>
      Promise.resolve({
        state: {
          bar: 'baz',
        },
      })
    const merged = merge(
      {
        actions: {
          loadConfigB: ({ actions }) => {
            return actions.lazy.loadConfig('configB')
          },
        },
      },
      lazy({ configA, configB })
    )
    const app = new Overmind(merged)

    return Promise.all([
      app.actions.lazy.loadConfig('configA'),
      app.actions.loadConfigB(),
    ]).then(() => {
      // @ts-ignore
      expect(app.state.configA.foo).toEqual('bar')
      // @ts-ignore
      expect(app.state.configB.bar).toEqual('baz')
      // @ts-ignore
      expect(app.actions.configA.returnStateFromB()).toEqual('baz')
    })
  })

  test('should merge normal and namespaced', () => {
    const configA = {
      state: {
        foo: 'bar',
      },
    }
    const configB = {
      state: {
        bar: 'baz',
      },
    }
    const merged = merge(configA, namespaced({ configB }))

    expect(merged.state.foo).toEqual('bar')
    expect(merged.state.configB.bar).toEqual('baz')
  })

  test('should merge without root state', () => {
    const configA = {}
    const configB = {
      state: {
        bar: 'baz',
      },
    }
    const merged = merge(configA, namespaced({ configB }))

    expect(merged.state.configB.bar).toEqual('baz')
  })

  test('should keep context when lazy loading namespaces', async () => {
    const config = {
      state: {
        foo: 'bar',
      },
      actions: {
        changeFoo(context) {
          context.state.config.foo = 'bar2'
        },
      },
    }

    const overmind = createOvermindMock(
      lazy({
        config: () => Promise.resolve(config),
      })
    )

    await overmind.onInitialize()

    await overmind.actions.lazy.loadConfig('config')
    // @ts-ignore
    overmind.actions.config.changeFoo()
    expect(overmind.state.config!.foo).toEqual('bar2')
  })
})
