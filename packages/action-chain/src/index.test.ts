import {
  actionChainFactory,
  actionBaseFactory,
  actionFactory,
  Action,
  NoValueAction,
  ActionChain,
  Execution,
} from './'

const context = {
  foo: {
    bar() {
      return 'baz'
    },
  },
}

type Context = typeof context

const actionChain = actionChainFactory<Context>(context)
const action = function<
  InitialValue = undefined
>(): InitialValue extends undefined
  ? NoValueAction<Context, InitialValue>
  : Action<Context, InitialValue> {
  return actionFactory<Context, InitialValue>(actionChain)
}

beforeEach(() => {
  ;(actionBaseFactory as any).nextActionId = 0
})

describe('VALUE', () => {
  test('should run and return result', () => {
    const test = action<string>()

    expect(test('foo')).toEqual('foo')
  })
})

describe('CONTEXT', () => {
  test('should pass default context', () => {
    expect.assertions(2)
    const test = action().do((_, { execution, path }: any) => {
      expect(execution).toBeTruthy()
      expect(path).toBeTruthy()
    })

    test()
  })

  test('should be able to extend context', () => {
    expect.assertions(1)
    const foo = action().do((_, { foo }) => {
      expect(foo.bar()).toBe('baz')
    })

    foo()
  })
})

describe('PROVIDER', () => {
  test('should track execution of providers', () => {
    expect.assertions(2)
    const foo = action().do((_, { foo }) => {
      expect(foo.bar()).toBe('baz')
    })

    actionChain.once('provider', (task) => {
      expect(task).toEqual({
        operatorId: 0,
        actionId: 0,
        executionId: 0,
        method: 'bar',
        name: 'foo',
        result: 'baz',
      })
    })
    foo()
  })
})

describe('ACTION CHAIN', () => {
  test('should track execution', () => {
    expect.assertions(4)
    const foo = action().map(() => {
      return 'foo'
    })

    actionChain.once('action:start', (data) => {
      expect(data).toEqual({
        actionId: 0,
        executionId: 0,
      })
    })
    actionChain.once('operator:start', (data) => {
      expect(data).toEqual({
        actionId: 0,
        executionId: 0,
        operatorId: 0,
        name: '',
        type: 'map',
        path: [],
      })
    })
    actionChain.once('operator:end', (data) => {
      expect(data).toEqual({
        actionId: 0,
        executionId: 0,
        operatorId: 0,
        name: '',
        type: 'map',
        isAsync: false,
        path: [],
        result: 'foo',
      })
    })
    actionChain.once('action:end', (data) => {
      expect(data).toEqual({
        actionId: 0,
        executionId: 0,
      })
    })

    foo()
  })
  test('should track async execution', () => {
    expect.assertions(2)
    const foo = () => {
      return Promise.resolve('foo')
    }
    const test = action().map(foo)

    actionChain.once('operator:start', (task) => {
      expect(task).toEqual({
        actionId: 0,
        operatorId: 0,
        executionId: 0,
        name: 'foo',
        path: [],
        type: 'map',
      })
    })
    actionChain.once('operator:end', (task) => {
      expect(task).toEqual({
        actionId: 0,
        operatorId: 0,
        executionId: 0,
        name: 'foo',
        path: [],
        type: 'map',
        isAsync: true,
        result: 'foo',
      })
    })

    return test()
  })
  test('should allow extending with new operators', () => {
    interface MyOperators<Context, InitialValue, Value> {
      log(): InitialValue extends undefined
        ? NoValueMyAction<Context, InitialValue, Value>
        : MyAction<Context, InitialValue, Value>
    }

    interface MyAction<Context, InitialValue, Value = InitialValue>
      extends MyOperators<Context, InitialValue, Value>,
        Action<Context, InitialValue, Value> {}

    interface NoValueMyAction<Context, InitialValue, Value = InitialValue>
      extends MyOperators<Context, InitialValue, Value>,
        NoValueAction<Context, InitialValue, Value> {}

    let hasLogged = false

    function myActionFactory<Context, InitialValue, Value = InitialValue>(
      actionChain: ActionChain<Context>,
      initialActionId?: number,
      runOperators?: (
        value: any,
        execution: Execution,
        path: string[]
      ) => any | Promise<any>
    ): InitialValue extends undefined
      ? NoValueMyAction<Context, InitialValue, Value>
      : MyAction<Context, InitialValue, Value> {
      return Object.assign(
        actionFactory<Context, InitialValue, Value>(
          actionChain,
          initialActionId,
          runOperators
        ) as any,
        {
          log() {
            const operator = (value) => {
              hasLogged = true
              return value
            }

            const [
              chain,
              initialActionId,
              runOperators,
            ] = this.createOperatorResult('log', '', operator)

            return myActionFactory<Context, InitialValue, Value>(
              chain,
              initialActionId,
              runOperators
            )
          },
        }
      )
    }

    expect.assertions(3)
    const myAction = function<
      InitialValue = undefined
    >(): InitialValue extends undefined
      ? NoValueMyAction<Context, InitialValue>
      : MyAction<Context, InitialValue> {
      return myActionFactory<Context, InitialValue>(actionChain)
    }
    const test = myAction<string>().log()
    actionChain.once('operator:start', (data) => {
      expect(data).toEqual({
        actionId: 0,
        executionId: 0,
        operatorId: 0,
        name: '',
        path: [],
        type: 'log',
      })
    })
    actionChain.once('operator:end', (data) => {
      expect(data).toEqual({
        actionId: 0,
        executionId: 0,
        operatorId: 0,
        name: '',
        type: 'log',
        path: [],
        isAsync: false,
        result: 'foo',
      })
    })
    test('foo')
    expect(hasLogged).toBe(true)
  })
})

describe('OPERATORS', () => {
  test('do', () => {
    expect.assertions(2)
    const test = action<string>().do((_, { foo }) => {
      expect(foo.bar()).toBe('baz')
    })

    expect(test('foo')).toBe('foo')
  })
  test('map', () => {
    expect.assertions(1)
    const test = action<string>().map((value) => {
      return value.toUpperCase()
    })

    expect(test('foo')).toBe('FOO')
  })
  test('try - resolved', () => {
    expect.assertions(1)
    const test = action().try(() => Promise.resolve(), {
      success: action().map(() => 'foo'),
      error: action(),
    })

    return Promise.resolve(test()).then((value) => {
      expect(value).toBe('foo')
    })
  })
  test('try - rejected', () => {
    expect.assertions(1)
    const test = action().try(() => Promise.reject(new Error()), {
      success: action().map(() => 'foo'),
      error: action().map(() => 'bar'),
    })

    return Promise.resolve(test()).then((value) => {
      expect(value).toBe('bar')
    })
  })
  test('when - true', () => {
    expect.assertions(1)
    const test = action().when(() => true, {
      true: action().map(() => 'foo'),
      false: action(),
    })

    expect(test()).toBe('foo')
  })
  test('when - false', () => {
    expect.assertions(1)
    const test = action().when(() => false, {
      true: action().map(() => 'foo'),
      false: action().map(() => 'bar'),
    })

    expect(test()).toBe('bar')
  })
  test('when - true', () => {
    expect.assertions(1)
    const test = action().when(() => true, {
      true: action().map(() => 'foo'),
      false: action(),
    })

    expect(test()).toBe('foo')
  })
  test('filter - true', () => {
    expect.assertions(1)
    const test = action<string>()
      .filter(() => true)
      .map(() => 'bar')

    expect(test('foo')).toBe('bar')
  })
  test('filter - false', () => {
    expect.assertions(1)
    const test = action<string>()
      .filter(() => false)
      .map(() => 'bar')

    expect(test('foo')).toBe('foo')
  })
  test('debounce', () => {
    expect.assertions(2)
    const start = Date.now()
    let end
    const test = action()
      .debounce(100)
      .do(() => {
        end = Date.now()
      })
      .map(() => 'foo')

    return Promise.resolve(test()).then((value) => {
      expect(value).toBe('foo')
      expect(end - start).toBeGreaterThanOrEqual(100)
    })
  })
})
