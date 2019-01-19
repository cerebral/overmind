import { merge, namespaced, lazy } from './'
import { Overmind } from '../'

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
          loadConfigB: ({ effects }) => {
            return effects.lazy.loadConfig('configB')
          },
        },
      },
      lazy({ configA, configB })
    )
    const app = new Overmind(merged)

    return Promise.all([
      app.actions.lazy.loadConfig('configA'),
      app.actions.loadConfigB({}),
    ])
      .then(() => {
        // @ts-ignore
        expect(app.state.configA.foo).toEqual('bar')
        // @ts-ignore
        expect(app.state.configB.bar).toEqual('baz')
      })
      .catch(() => {
        console.log('WUUUT?')
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
})
