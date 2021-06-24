import { EventType, IContext, Overmind, SERIALIZE, rehydrate } from './'
import { namespaced } from './config'

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
    value: (null as unknown) as StateValue,
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
