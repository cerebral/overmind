import {
  EventType,
  IContext,
  Overmind,
  SERIALIZE,
  createOvermind,
  rehydrate,
  statemachine,
} from '..'
import { merge, namespaced } from './config'

function toJSON(obj) {
  return JSON.parse(JSON.stringify(obj))
}

class StateValue {
  value = 'foo'
  toJSON() {
    return {
      [SERIALIZE]: true,
      value: this.value,
    }
  }

  static fromJSON(json: { value: string }) {
    const instance = new StateValue()
    instance.value = json.value
    return instance
  }
}

function createDefaultOvermind() {
  const state = {
    foo: 'bar',
    item: {
      isAwesome: true,
    },
    value: null as unknown as StateValue,
  }
  const changeFoo = (context: Context) => {
    context.state.foo = 'bar2'

    return 'changeFoo'
  }
  const changeFooWithEffect = (context: Context) => {
    context.state.foo = context.effects.hello()
  }
  const waitAndChangeFoo = (context: Context) => {
    return context.effects.wait().then(() => {
      context.state.foo = 'bar2'
    })
  }
  const asyncChangeFoo = async (context: Context) => {
    await Promise.resolve()
    context.state.foo = 'bar2'
  }
  const changeValue = (_, value: { isAwesome: boolean }) => {
    value.isAwesome = !value.isAwesome
  }
  const changeOptionalFoo = (context: Context, newFoo?: string) => {
    if (newFoo !== undefined) {
      context.state.foo = newFoo
    } else {
      context.state.foo = 'default-foo'
    }
  }
  const asyncChangeOptionalFoo = async (context: Context, newFoo?: string) => {
    await Promise.resolve()
    if (newFoo !== undefined) {
      context.state.foo = newFoo
    } else {
      context.state.foo = 'async-default-foo'
    }
  }
  const changeFormValue = (
    _: Context,
    payload: {
      key: string
      form: { [key: string]: any }
      value: any
    }
  ) => {
    const { form, key, value } = payload
    form[key] = value
  }
  const rehydrateAction = ({ state }: Context, newState: any) => {
    rehydrate(state, newState, {
      value: StateValue.fromJSON,
    })
  }
  const actions = {
    asyncChangeFoo,
    changeFormValue,
    changeFoo,
    changeFooWithEffect,
    changeValue,
    waitAndChangeFoo,
    rehydrateAction,
    changeOptionalFoo,
    asyncChangeOptionalFoo,
  }
  const effects = {
    hello() {
      return 'hello'
    },
    wait() {
      return Promise.resolve()
    },
  }
  const config = {
    state,
    actions,
    effects,
  }

  type Context = IContext<{
    state: typeof state
    actions: {
      asyncChangeFoo: typeof actions.asyncChangeFoo
      changeFormValue: typeof actions.changeFormValue
      changeFoo: typeof actions.changeFoo
      changeFooWithEffect: typeof actions.changeFooWithEffect
      changeValue: typeof actions.changeValue
      waitAndChangeFoo: typeof actions.waitAndChangeFoo
      rehydrateAction: typeof actions.rehydrateAction
      changeOptionalFoo: typeof actions.changeOptionalFoo
      asyncChangeOptionalFoo: typeof actions.asyncChangeOptionalFoo
    }
    effects: typeof effects
  }>

  const app = new Overmind(config)

  return app
}

describe('Overmind', () => {
  test('should instantiate app with state', () => {
    const app = new Overmind({
      state: {
        foo: 'bar',
      },
    })

    expect(app.state.foo).toEqual('bar')
  })

  test('should instantiate app with onInitialize', async () => {
    expect.assertions(2)
    let value: any
    const app = new Overmind({
      state: {
        foo: 'bar',
      },
      actions: {
        onInitializeOvermind(context, val) {
          expect(context.state.foo).toBe('bar')
          value = val
        },
        doThis() {},
      },
    })
    await app.initialized
    expect(value).toBe(app)
  })
  test('should be able to type actions', () => {
    expect.assertions(2)

    const app = createDefaultOvermind()

    expect(app.state.foo).toBe('bar')
    app.actions.changeFoo()
    expect(app.state.foo).toBe('bar2')
  })
  test('should allow changing state in actions', () => {
    expect.assertions(2)
    const app = createDefaultOvermind()

    expect(app.state.foo).toBe('bar')
    app.actions.changeFoo()
    expect(app.state.foo).toBe('bar2')
  })
  test('should expose effects to actions', () => {
    expect.assertions(2)
    const app = createDefaultOvermind()

    expect(app.state.foo).toBe('bar')
    app.actions.changeFooWithEffect()
    expect(app.state.foo).toBe('hello')
  })
  test('should allow actions to return a value', () => {
    const app = createDefaultOvermind()

    expect(app.actions.changeFoo()).toBe('changeFoo')
  })
  test('should be able to do mutations async via effects', () => {
    expect.assertions(2)
    const app = createDefaultOvermind()
    expect(app.state.foo).toBe('bar')
    return app.actions.waitAndChangeFoo().then(() => {
      expect(app.state.foo).toBe('bar2')
    })
  })
  test('should track action start and end', async () => {
    expect.assertions(2)
    const app = new Overmind({
      actions: {
        doThis() {},
      },
    })
    await app.initialized

    app.eventHub.once(EventType.ACTION_START, (data) => {
      expect(toJSON(data)).toEqual({
        actionId: 'doThis',
        actionName: 'doThis',
        isRunning: true,
        namespacePath: [],
        executionId: 1,
        operatorId: 0,
        path: [],
        type: 'action',
      })
    })
    app.eventHub.on(EventType.ACTION_END, (data) => {
      expect(toJSON(data)).toEqual({
        actionId: 'doThis',
        isRunning: false,
        executionId: 1,
        actionName: 'doThis',
        namespacePath: [],
        operatorId: 0,
        path: [],
        type: 'action',
      })
    })
    app.actions.doThis()
  })
  test('should track operator start and end', async () => {
    expect.assertions(2)
    const app = new Overmind({
      actions: {
        doThis() {},
      },
    })
    await app.initialized

    app.eventHub.once(EventType.OPERATOR_START, (data) => {
      expect(toJSON(data)).toEqual({
        actionId: 'doThis',
        isRunning: true,
        actionName: 'doThis',
        path: [],
        executionId: 1,
        operatorId: 0,
        namespacePath: [],
        type: 'action',
      })
    })
    app.eventHub.once(EventType.OPERATOR_END, (data) => {
      expect(toJSON(data)).toEqual({
        actionId: 'doThis',
        isRunning: false,
        actionName: 'doThis',
        path: [],
        isAsync: false,
        executionId: 1,
        operatorId: 0,
        namespacePath: [],
        type: 'action',
      })
    })
    app.actions.doThis()
  })
  test('should track mutations', async () => {
    expect.assertions(1)
    const app = createDefaultOvermind()
    await app.initialized
    app.eventHub.once(EventType.MUTATIONS, (data) => {
      expect(toJSON(data)).toEqual({
        actionId: 'changeFoo',
        isRunning: true,
        actionName: 'changeFoo',
        mutations: [
          {
            args: ['bar2'],
            method: 'set',
            path: 'foo',
            hasChangedValue: true,
            delimiter: '.',
          },
        ],
        executionId: 1,
        operatorId: 0,
        namespacePath: [],
        path: [],
        type: 'action',
      })
    })
    app.actions.changeFoo()
  })
  test('should track async mutations', async () => {
    expect.assertions(1)
    const app = createDefaultOvermind()
    await app.initialized
    app.eventHub.on(EventType.MUTATIONS, (data) => {
      expect(toJSON(data)).toEqual({
        actionId: 'waitAndChangeFoo',
        isRunning: true,
        actionName: 'waitAndChangeFoo',
        mutations: [
          {
            args: ['bar2'],
            method: 'set',
            path: 'foo',
            hasChangedValue: true,
            delimiter: '.',
          },
        ],
        executionId: 1,
        operatorId: 0,
        namespacePath: [],
        path: [],
        type: 'action',
      })
    })
    await app.actions.waitAndChangeFoo()
  })
  test('should track async mutations with async await', async () => {
    expect.assertions(1)
    const app = createDefaultOvermind()
    await app.initialized
    app.eventHub.on(EventType.MUTATIONS, (data) => {
      expect(toJSON(data)).toEqual({
        actionId: 'asyncChangeFoo',
        isRunning: true,
        actionName: 'asyncChangeFoo',
        mutations: [
          {
            args: ['bar2'],
            method: 'set',
            path: 'foo',
            hasChangedValue: true,
            delimiter: '.',
          },
        ],
        executionId: 1,
        operatorId: 0,
        path: [],
        namespacePath: [],
        type: 'action',
      })
    })
    await app.actions.asyncChangeFoo()
  })
  test('should instantiate app with modules', () => {
    const foo = {
      state: {
        foo: 'bar',
      },
      actions: {
        foo() {},
      },
    }
    const bar = {
      state: {
        bar: 'baz',
      },
      effects: {
        hello: () => 'hello',
      },
      actions: {
        bar() {},
      },
    }

    const config = Object.assign(
      {},
      namespaced({
        foo,
        bar,
      })
    )

    const app = new Overmind(config)

    expect(app.state.foo.foo).toEqual('bar')
    expect(app.state.bar.bar).toEqual('baz')
    expect(typeof app.actions.foo.foo).toBe('function')
    expect(typeof app.actions.bar.bar).toBe('function')
  })
  test('should instantiate modules with onInitialize', () => {
    const result: string[] = []
    const app = new Overmind(
      namespaced({
        foo: {
          actions: {
            onInitializeOvermind: () => {
              result.push('foo')
            },
          },
        },
        bar: {
          actions: {
            onInitializeOvermind: () => {
              result.push('bar')
            },
          },
        },
      })
    )

    return app.initialized.then(() => {
      expect(result).toEqual(['foo', 'bar'])
    })
  })
  test('should allow mutations on passed values', () => {
    expect.assertions(2)
    const app = createDefaultOvermind()
    expect(() => app.actions.changeValue(app.state.item)).not.toThrow()
    expect(app.state.item.isAwesome).toBe(false)
  })
  test('should allow mutations on passed values in object', () => {
    expect.assertions(2)
    const app = createDefaultOvermind()
    expect(() =>
      app.actions.changeFormValue({
        form: app.state.item,
        key: 'isAwesome',
        value: false,
      })
    ).not.toThrow()
    expect(app.state.item.isAwesome).toBe(false)
  })
  test('should rehydrate mutations on hot reload', () => {
    expect.assertions(2)
    const app = createDefaultOvermind()
    app.actions.changeFoo()
    expect(app.state.foo).toBe('bar2')
    app.reconfigure({
      state: {
        foo: 'bar',
      },
    })
    expect(app.state.foo).toBe('bar2')
  })
  test('should rehydrate actions on hot reload', () => {
    expect.assertions(2)
    const app = createDefaultOvermind()
    const changeFoo = app.actions.changeFoo
    app.reconfigure({
      state: {
        foo: 'bar2',
      },
      actions: {
        changeFoo(context) {
          context.state.foo = 'replaced!'
        },
      },
    })

    expect(app.state.foo).toBe('bar2')
    changeFoo()
    expect(app.state.foo).toBe('replaced!')
  })
  test('should allow actions with optional parameter', async () => {
    const app = createDefaultOvermind()
    app.actions.changeOptionalFoo()
    expect(app.state.foo).toBe('default-foo')
    await app.actions.asyncChangeOptionalFoo()
    expect(app.state.foo).toBe('async-default-foo')

    const newFoo = 'new-foo'
    app.actions.changeOptionalFoo(newFoo)
    expect(app.state.foo).toBe(newFoo)

    const newAsyncFoo = 'new-async-foo'
    await app.actions.asyncChangeOptionalFoo(newAsyncFoo)
    expect(app.state.foo).toBe(newAsyncFoo)
  })
})

describe('Namespaced module scoping', () => {
  test('should allow module actions to access own state without namespace', () => {
    const app = new Overmind(
      namespaced({
        router: {
          state: {
            currentPath: '/',
          },
          actions: {
            navigate({ state }) {
              state.currentPath = '/new-path'
            },
          },
        },
      })
    )

    expect(app.state.router.currentPath).toBe('/')
    app.actions.router.navigate()
    expect(app.state.router.currentPath).toBe('/new-path')
  })

  test('should allow module actions to access own effects without namespace', () => {
    const app = new Overmind(
      namespaced({
        router: {
          state: {
            baseUrl: '',
          },
          effects: {
            getBaseUrl() {
              return 'https://example.com'
            },
          },
          actions: {
            initialize({ state, effects }) {
              state.baseUrl = effects.getBaseUrl()
            },
          },
        },
      })
    )

    app.actions.router.initialize()
    expect(app.state.router.baseUrl).toBe('https://example.com')
  })

  test('should allow module actions to call own actions without namespace', () => {
    const app = new Overmind(
      namespaced({
        router: {
          state: {
            path: '/',
            history: [] as string[],
          },
          actions: {
            addToHistory({ state }, path: string) {
              state.history.push(path)
            },
            navigate({ state, actions }, path: string) {
              state.path = path
              actions.addToHistory(path)
            },
          },
        },
      })
    )

    app.actions.router.navigate('/about')
    expect(app.state.router.path).toBe('/about')
    expect(app.state.router.history).toEqual(['/about'])
  })

  test('should allow module to access nested properties within its namespace', () => {
    const app = new Overmind(
      namespaced({
        router: {
          state: {
            config: {
              baseUrl: '/',
              history: {
                maxSize: 10,
              },
            },
          },
          actions: {
            updateMaxSize({ state }, size: number) {
              state.config.history.maxSize = size
            },
          },
        },
      })
    )

    app.actions.router.updateMaxSize(20)
    expect(app.state.router.config.history.maxSize).toBe(20)
  })

  test('should allow module to access shared root-level effects', () => {
    const app = new Overmind(
      merge(
        {
          effects: {
            http: {
              get: () => 'data',
            },
          },
        },
        namespaced({
          router: {
            state: {
              data: '',
            },
            actions: {
              fetchData({ state, effects }) {
                state.data = (effects as any).http.get()
              },
            },
          },
        })
      )
    )

    app.actions.router.fetchData()
    expect(app.state.router.data).toBe('data')
  })

  test('should allow module to access other modules via root', () => {
    const app = new Overmind(
      namespaced({
        auth: {
          state: {
            user: 'John',
          },
        },
        router: {
          state: {
            userName: '',
          },
          actions: {
            getUserName({ state }) {
              // Access other module via root fallback
              state.userName = (state as any).auth.user
            },
          },
        },
      })
    )

    app.actions.router.getUserName()
    expect(app.state.router.userName).toBe('John')
  })

  test('should allow module to call actions from other modules', () => {
    const app = new Overmind(
      namespaced({
        auth: {
          state: {
            isLoggedIn: false,
          },
          actions: {
            login({ state }) {
              state.isLoggedIn = true
            },
          },
        },
        router: {
          state: {
            redirected: false,
          },
          actions: {
            navigateProtected({ state, actions }) {
              ;(actions as any).auth.login()
              state.redirected = true
            },
          },
        },
      })
    )

    app.actions.router.navigateProtected()
    expect(app.state.auth.isLoggedIn).toBe(true)
    expect(app.state.router.redirected).toBe(true)
  })

  test('should work with async actions in modules', async () => {
    const app = new Overmind(
      namespaced({
        router: {
          state: {
            loading: false,
            path: '/',
          },
          effects: {
            async fetchPath() {
              return '/async-path'
            },
          },
          actions: {
            async navigate({ state, effects }) {
              state.loading = true
              state.path = await effects.fetchPath()
              state.loading = false
            },
          },
        },
      })
    )

    await app.actions.router.navigate()
    expect(app.state.router.loading).toBe(false)
    expect(app.state.router.path).toBe('/async-path')
  })

  test('should work with deeply nested module structures', () => {
    const app = new Overmind(
      namespaced({
        router: {
          state: {
            routes: {
              home: '/',
              about: '/about',
            },
          },
          effects: {
            helpers: {
              parseRoute(path: string) {
                return path.toUpperCase()
              },
            },
          },
          actions: {
            setRoute({ state, effects }, key: 'home' | 'about') {
              const path = state.routes[key]
              state.routes[key] = (effects as any).helpers.parseRoute(path)
            },
          },
        },
      })
    )

    app.actions.router.setRoute('home')
    expect(app.state.router.routes.home).toBe('/')
  })

  test('should track mutations in namespaced modules correctly', async () => {
    expect.assertions(1)
    const app = new Overmind(
      namespaced({
        router: {
          state: {
            path: '/',
          },
          actions: {
            navigate({ state }) {
              state.path = '/new'
            },
          },
        },
      })
    )
    await app.initialized

    app.eventHub.once(EventType.MUTATIONS, (data) => {
      expect(toJSON(data)).toEqual({
        actionId: 'router.navigate',
        isRunning: true,
        actionName: 'router.navigate',
        mutations: [
          {
            args: ['/new'],
            method: 'set',
            path: 'router.path',
            hasChangedValue: true,
            delimiter: '.',
          },
        ],
        executionId: expect.any(Number),
        operatorId: 0,
        namespacePath: ['router'],
        path: [],
        type: 'action',
      })
    })

    app.actions.router.navigate()
  })

  test('should work with multiple levels of namespacing', () => {
    const app = new Overmind(
      namespaced({
        modules: merge(
          { state: {} },
          namespaced({
            router: {
              state: {
                path: '/',
              },
              actions: {
                navigate({ state }) {
                  state.path = '/nested'
                },
              },
            },
          })
        ),
      })
    )

    expect((app.state as any).modules.router.path).toBe('/')
    ;(app.actions as any).modules.router.navigate()
    expect((app.state as any).modules.router.path).toBe('/nested')
  })

  test('should not break non-namespaced actions', () => {
    const app = new Overmind({
      state: {
        count: 0,
      },
      actions: {
        increment({ state }) {
          state.count++
        },
      },
    })

    expect(app.state.count).toBe(0)
    app.actions.increment()
    expect(app.state.count).toBe(1)
  })

  test('should work with mixed namespaced and non-namespaced config', () => {
    const app = new Overmind(
      merge(
        {
          state: {
            global: 'value',
          },
          actions: {
            changeGlobal({ state }) {
              state.global = 'changed'
            },
          },
        },
        namespaced({
          router: {
            state: {
              path: '/',
            },
            actions: {
              navigate({ state, actions }) {
                state.path = '/new'
                ;(actions as any).changeGlobal()
              },
            },
          },
        })
      )
    )

    app.actions.router.navigate()
    expect(app.state.router.path).toBe('/new')
    expect(app.state.global).toBe('changed')
  })

  test('should handle effects being called with parameters', () => {
    const app = new Overmind(
      namespaced({
        router: {
          state: {
            result: '',
          },
          effects: {
            buildUrl(base: string, path: string) {
              return `${base}${path}`
            },
          },
          actions: {
            navigate({ state, effects }, path: string) {
              state.result = effects.buildUrl('https://example.com', path)
            },
          },
        },
      })
    )

    app.actions.router.navigate('/about')
    expect(app.state.router.result).toBe('https://example.com/about')
  })

  test('should preserve module isolation when multiple modules access same effect name', () => {
    const app = new Overmind(
      namespaced({
        moduleA: {
          state: {
            value: '',
          },
          effects: {
            getValue() {
              return 'A'
            },
          },
          actions: {
            update({ state, effects }) {
              state.value = effects.getValue()
            },
          },
        },
        moduleB: {
          state: {
            value: '',
          },
          effects: {
            getValue() {
              return 'B'
            },
          },
          actions: {
            update({ state, effects }) {
              state.value = effects.getValue()
            },
          },
        },
      })
    )

    app.actions.moduleA.update()
    app.actions.moduleB.update()
    expect(app.state.moduleA.value).toBe('A')
    expect(app.state.moduleB.value).toBe('B')
  })

  test('should replace namespace object when action assigns the namespace key (no nested duplication)', () => {
    const app = new Overmind({
      state: {
        user: {
          status: 'logged_in',
        },
      },
      actions: {
        user: {
          logout({ state }: any) {
            ;(state as any)._probe = 'probe'
            state.user = { status: 'logged_out' }
          },
        },
      },
    })

    // Initial state
    expect(app.state.user.status).toBe('logged_in')
    // Execute logout which replaces the whole namespace object
    app.actions.user.logout()
    // Ensure the whole namespace object was replaced, not nested under itself
    expect(app.state.user.status).toBe('logged_out')
    // Ensure we didn't accidentally merge or create nested user.user
    expect((app.state as any).user.user).toBeUndefined()
  })
})

describe('Namespaced module scoping with statemachines', () => {
  test('should allow statemachine to work in namespaced module', () => {
    type States =
      | {
          current: 'IDLE'
        }
      | {
          current: 'LOADING'
        }
      | {
          current: 'LOADED'
          data: string
        }

    type Events =
      | { type: 'START_LOAD' }
      | { type: 'LOAD_SUCCESS'; data: string }
      | { type: 'RESET' }

    const machine = statemachine<States, Events>({
      IDLE: {
        START_LOAD: () => ({ current: 'LOADING' }),
      },
      LOADING: {
        LOAD_SUCCESS: (data) => ({ current: 'LOADED', data }),
        RESET: () => ({ current: 'IDLE' }),
      },
      LOADED: {
        RESET: () => ({ current: 'IDLE' }),
      },
    })

    const app = createOvermind(
      namespaced({
        router: {
          state: machine.create({ current: 'IDLE' }),
          actions: {
            startLoad({ state }) {
              state.send('START_LOAD')
            },
            loadSuccess({ state }, data: string) {
              state.send('LOAD_SUCCESS', data)
            },
            reset({ state }) {
              state.send('RESET')
            },
          },
        },
      })
    )

    // Initial state
    expect(app.state.router.current).toBe('IDLE')

    // Transition to loading
    app.actions.router.startLoad()
    expect(app.state.router.current).toBe('LOADING')

    // Transition to loaded
    app.actions.router.loadSuccess('test data')
    expect(app.state.router.current).toBe('LOADED')
    expect((app.state.router as any).data).toBe('test data')

    // Reset
    app.actions.router.reset()
    expect(app.state.router.current).toBe('IDLE')
  })

  test('should allow statemachine with baseState in namespaced module', () => {
    type States =
      | {
          current: 'OFF'
        }
      | {
          current: 'ON'
          brightness: number
        }

    type Events = { type: 'TOGGLE' } | { type: 'SET_BRIGHTNESS'; data: number }

    type BaseState = {
      name: string
    }

    const machine = statemachine<States, Events, BaseState>({
      OFF: {
        TOGGLE: () => ({
          current: 'ON',
          brightness: 50,
        }),
      },
      ON: {
        TOGGLE: () => ({ current: 'OFF' }),
        SET_BRIGHTNESS: (brightness) => ({ current: 'ON', brightness }),
      },
    })

    const app = createOvermind(
      namespaced({
        device: {
          state: machine.create({ current: 'OFF' }, { name: 'Light' }),
          actions: {
            toggle({ state }) {
              state.send('TOGGLE')
            },
            setBrightness({ state }, brightness: number) {
              state.send('SET_BRIGHTNESS', brightness)
            },
          },
        },
      })
    )

    // Check baseState is accessible
    expect((app.state.device as any).name).toBe('Light')
    expect(app.state.device.current).toBe('OFF')

    // Toggle on
    app.actions.device.toggle()
    expect(app.state.device.current).toBe('ON')
    expect((app.state.device as any).brightness).toBe(50)

    // Set brightness
    app.actions.device.setBrightness(75)
    expect((app.state.device as any).brightness).toBe(75)
    expect((app.state.device as any).name).toBe('Light')

    // Toggle off
    app.actions.device.toggle()
    expect(app.state.device.current).toBe('OFF')
  })

  test('should allow using matches() in namespaced module', () => {
    type States = { current: 'IDLE' } | { current: 'ACTIVE' }

    type Events = { type: 'ACTIVATE' } | { type: 'DEACTIVATE' }

    const machine = statemachine<States, Events>({
      IDLE: {
        ACTIVATE: () => ({ current: 'ACTIVE' }),
      },
      ACTIVE: {
        DEACTIVATE: () => ({ current: 'IDLE' }),
      },
    })

    const app = createOvermind(
      namespaced({
        module: {
          state: machine.create({ current: 'IDLE' }),
          actions: {
            checkIdle({ state }) {
              return !!state.matches('IDLE')
            },
            checkActive({ state }) {
              return !!state.matches('ACTIVE')
            },
            activate({ state }) {
              state.send('ACTIVATE')
            },
          },
        },
      })
    )

    expect(app.actions.module.checkIdle()).toBe(true)
    expect(app.actions.module.checkActive()).toBe(false)

    app.actions.module.activate()

    expect(app.actions.module.checkIdle()).toBe(false)
    expect(app.actions.module.checkActive()).toBe(true)
  })

  test('should transition statemachine in namespaced module using function', () => {
    type States = { current: 'FOO' } | { current: 'BAR' }

    type Events = { type: 'TOGGLE' }

    const machine = statemachine<States, Events>((_, state) => {
      return { current: state.current === 'FOO' ? 'BAR' : 'FOO' }
    })

    const app = createOvermind(
      namespaced({
        test: {
          state: machine.create({ current: 'FOO' }),
          actions: {
            toggle({ state }) {
              state.send('TOGGLE')
            },
          },
        },
      })
    )

    expect(app.state.test.current).toBe('FOO')
    app.actions.test.toggle()
    expect(app.state.test.current).toBe('BAR')
    app.actions.test.toggle()
    expect(app.state.test.current).toBe('FOO')
  })

  test('should work with StateMachine in a real app structure', async () => {
    type RouterStates =
      | { current: 'IDLE' }
      | { current: 'NAVIGATING'; path: string }

    type RouterEvents =
      | { type: 'NAVIGATE'; data: string }
      | { type: 'COMPLETE' }

    const routerMachine = statemachine<RouterStates, RouterEvents>({
      IDLE: {
        NAVIGATE: (path) => ({ current: 'NAVIGATING', path }),
      },
      NAVIGATING: {
        COMPLETE: () => ({ current: 'IDLE' }),
      },
    })

    type AppStates = { current: 'READY' }
    type AppEvents = { type: 'INIT' }

    const appMachine = statemachine<AppStates, AppEvents>({
      READY: {},
    })

    const app = createOvermind(
      namespaced({
        app: {
          state: appMachine.create({ current: 'READY' }),
        },
        router: {
          state: routerMachine.create({ current: 'IDLE' }),
          actions: {
            navigate({ state }, path: string) {
              state.send('NAVIGATE', path)
            },
            complete({ state }) {
              state.send('COMPLETE')
            },
          },
        },
      })
    )

    await app.initialized

    expect(app.state.router.current).toBe('IDLE')
    app.actions.router.navigate('/test')
    expect(app.state.router.current).toBe('NAVIGATING')
    expect((app.state.router as any).path).toBe('/test')
  })

  test('should allow using matches() on nested statemachines', () => {
    type SelectingRowsStates = { current: 'SELECTED'; count: number }
    type SelectingRowsEvents = { type: 'DESELECT_ALL' }

    const selectingRowsMachine = statemachine<
      SelectingRowsStates,
      SelectingRowsEvents
    >({
      SELECTED: {
        DESELECT_ALL: () => ({ current: 'SELECTED', count: 0 }),
      },
    })

    type RowSelectionStates =
      | { current: 'INACTIVE' }
      | { current: 'ACTIVE'; selectedRows: any }

    type RowSelectionEvents = { type: 'ACTIVATE' | 'DEACTIVATE' }

    const rowSelectionMachine = statemachine<
      RowSelectionStates,
      RowSelectionEvents
    >({
      INACTIVE: {
        ACTIVATE: () => ({
          current: 'ACTIVE',
          selectedRows: selectingRowsMachine.create({
            current: 'SELECTED',
            count: 1,
          }),
        }),
      },
      ACTIVE: {
        DEACTIVATE: () => ({ current: 'INACTIVE' }),
      },
    })

    const app = createOvermind(
      namespaced({
        dispatcherBook: {
          state: {
            rowSelection: rowSelectionMachine.create({ current: 'INACTIVE' }),
          },
          actions: {
            testMatches({ state }: any) {
              return state.rowSelection.matches('ACTIVE')
            },
          },
        },
      })
    )

    const initialResult = (app.actions as any).dispatcherBook.testMatches()
    expect(initialResult).toBeUndefined()

    app.state.dispatcherBook.rowSelection.send('ACTIVATE')

    const activeResult = (app.actions as any).dispatcherBook.testMatches()
    expect(activeResult).toBe(app.state.dispatcherBook.rowSelection)

    const nestedRowSelection = app.state.dispatcherBook.rowSelection as any
    expect(nestedRowSelection.selectedRows.matches('SELECTED')).toBe(
      nestedRowSelection.selectedRows
    )
  })
})
