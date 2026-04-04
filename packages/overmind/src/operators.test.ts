import {
  Overmind,
  pipe,
  branch,
  filter,
  fork,
  when,
  wait,
  debounce,
  parallel,
  catchError,
  tryCatch,
  throttle,
  waitUntil,
  IContext,
} from './'
import { IS_OPERATOR } from './utils'

describe('OPERATORS', () => {
  test('branch - passes input as output', async () => {
    expect.assertions(1)

    const state = {
      foo: 'bar',
    }

    const actions = {
      test: pipe(
        branch((_, value: string) => value.toUpperCase()),
        ({ state }: Context, value) => {
          state.foo = value
        }
      ),
    }

    const config = {
      state,
      actions,
    }

    type Context = IContext<{
      state: typeof state
      actions: {
        test: typeof actions.test
      }
    }>

    const overmind = new Overmind(config)

    await overmind.actions.test('foo')

    expect(overmind.state.foo).toBe('foo')
  })

  test('action - return value', async () => {
    expect.assertions(1)

    const state = {
      foo: 'bar',
    }

    const actions = {
      test: pipe(
        (_, value: string) => value.toUpperCase(),
        ({ state }: Context, value) => {
          state.foo = value
        }
      ),
    }

    const config = {
      state,
      actions,
    }

    type Context = IContext<{
      state: typeof state
      actions: {
        test: typeof actions.test
      }
    }>

    const overmind = new Overmind(config)

    await overmind.actions.test('foo')

    expect(overmind.state.foo).toBe('FOO')
  })

  test('action - return value async', () => {
    expect.assertions(1)
    const test = pipe(
      (_, value: string) => Promise.resolve(value.toUpperCase()),
      ({ state }: Context, value) => {
        state.foo = value
      }
    )

    const state = {
      foo: 'bar',
    }

    const actions = { test }

    const config = {
      state,
      actions,
    }

    type Context = IContext<{
      state: typeof state
      actions: {
        test: typeof actions.test
      }
    }>

    const overmind = new Overmind(config)

    return overmind.actions.test('foo').then(() => {
      expect(overmind.state.foo).toBe('FOO')
    })
  })

  test('parallel', async () => {
    expect.assertions(1)
    const operatorA = () => {
      return Promise.resolve('A')
    }
    const operatorB = () => {
      return Promise.resolve('B')
    }

    const actions = {
      test: parallel(operatorA, operatorB),
    }

    const config = {
      actions,
    }

    const overmind = new Overmind(config)

    const result = await overmind.actions.test()
    expect(result).toEqual(['A', 'B'])
  })

  test('filter - truthy', () => {
    expect.assertions(1)
    const test = pipe(
      filter((_, value: string) => value === 'foo'),
      ({ state }: Context, value) => (state.foo = value.toUpperCase())
    )

    const state = {
      foo: 'bar',
    }
    const actions = {
      test,
    }
    const config = {
      state,
      actions,
    }

    type Context = IContext<{
      state: typeof state
      actions: {
        test: typeof actions.test
      }
    }>

    const overmind = new Overmind(config)

    return overmind.actions.test('foo').then(() => {
      expect(overmind.state.foo).toBe('FOO')
    })
  })

  test('filter - falsy', () => {
    const test = pipe(
      filter((_, value: string) => value === 'bar'),
      ({ state }: Context, value) => (state.foo = value.toUpperCase())
    )

    const state = {
      foo: 'bar',
    }
    const actions = {
      test,
    }
    const config = {
      state,
      actions,
    }

    type Context = IContext<{
      state: typeof state
      actions: {
        test: typeof actions.test
      }
    }>

    const overmind = new Overmind(config)

    return overmind.actions.test('foo').then(() => {
      expect(overmind.state.foo).toBe('bar')
    })
  })

  test('fork', () => {
    expect.assertions(1)
    type Test =
      | {
          type: 'foo'
          data: number
        }
      | {
          type: 'bar'
          data: string
        }
    const test = pipe(
      () => ({ type: 'foo' }) as Test,
      fork('type', {
        foo: () => {
          return 'FOO'
        },
        bar: () => {
          return 'BAR'
        },
      }),
      ({ state }: Context, value: string) => {
        state.foo = value
      }
    )
    const state = {
      foo: 'bar',
    }
    const actions = {
      test,
    }
    const config = {
      state,
      actions,
    }
    const overmind = new Overmind(config)

    type Context = IContext<{
      state: typeof state
      actions: {
        test: typeof actions.test
      }
    }>

    return overmind.actions.test().then(() => {
      expect(overmind.state.foo).toBe('FOO')
    })
  })

  test('when', () => {
    expect.assertions(1)
    const test = when(() => true, {
      true: ({ state }: Context, value: string) => {
        state.foo = value.toUpperCase()
      },
      false: ({ state }: Context, value) => (state.number = Number(value)),
    })

    const state = {
      foo: 'bar',
      number: 0,
    }
    const actions = {
      test,
    }
    const config = {
      state,
      actions,
    }
    const overmind = new Overmind(config)

    type Context = IContext<{
      state: typeof state
      actions: {
        test: typeof actions.test
      }
    }>

    return overmind.actions.test('foo').then(() => {
      expect(overmind.state.foo).toBe('FOO')
    })
  })

  test('wait', () => {
    expect.assertions(1)
    const runTime = Date.now()
    const test = wait(500)
    const actions = { test }
    const config = {
      actions,
    }
    const overmind = new Overmind(config)

    return overmind.actions.test().then(() => {
      expect(Date.now() - runTime).toBeGreaterThanOrEqual(500)
    })
  })

  test('debounce', () => {
    expect.assertions(1)
    const test = pipe(debounce(100), ({ state }: Context) => state.runCount++)
    const state = {
      runCount: 0,
    }
    const actions = {
      test,
    }
    const config = {
      state,
      actions,
    }
    const overmind = new Overmind(config)

    type Context = IContext<{
      state: typeof state
      actions: {
        test: typeof actions.test
      }
    }>

    return Promise.all([overmind.actions.test(), overmind.actions.test()]).then(
      () => {
        expect(overmind.state.runCount).toBe(1)
      }
    )
  })

  test('throttle', () => {
    expect.assertions(1)
    const test = pipe(throttle(0), ({ state }: Context) => state.runCount++)
    const state = {
      runCount: 0,
    }
    const actions = {
      test,
    }
    const config = {
      state,
      actions,
    }
    const overmind = new Overmind(config)

    type Context = IContext<{
      state: typeof state
      actions: {
        test: typeof actions.test
      }
    }>

    return Promise.all([overmind.actions.test(), overmind.actions.test()]).then(
      () => {
        expect(overmind.state.runCount).toBe(1)
      }
    )
  })

  test('throttle passes most recent value', () => {
    expect.assertions(2)
    const test = pipe(throttle(0), ({ state }: Context, value: number) => {
      state.lastValue = value
      state.runCount++
    })
    const state = {
      lastValue: -1,
      runCount: 0,
    }
    const actions = {
      test,
    }
    const config = {
      state,
      actions,
    }
    const overmind = new Overmind(config)

    type Context = IContext<{
      state: typeof state
      actions: {
        test: typeof actions.test
      }
    }>

    return Promise.all([
      overmind.actions.test(1),
      overmind.actions.test(2),
      overmind.actions.test(3),
    ]).then(() => {
      expect(overmind.state.runCount).toBe(1)
      expect(overmind.state.lastValue).toBe(3)
    })
  })

  test('catchError', () => {
    expect.assertions(3)
    const test = pipe(
      (() => {
        throw new Error('wut?!?')
      }) as (context: Context, payload: string) => string,
      ({ state }: Context, payload: string) => {
        state.runCount++

        return payload
      },
      catchError(({ state }: Context, error) => {
        state.error = error.message

        return 'hm'
      }),
      ({ state }: Context, value) => {
        state.foo = value
      }
    )
    const state = {
      runCount: 0,
      foo: 'bar',
      error: '',
    }
    const actions = {
      test,
    }
    const config = {
      state,
      actions,
    }
    const overmind = new Overmind(config)

    type Context = IContext<{
      state: typeof state
      actions: {
        test: typeof actions.test
      }
    }>

    return overmind.actions.test('baz').then(() => {
      expect(overmind.state.runCount).toBe(0)
      expect(overmind.state.error).toBe('wut?!?')
      expect(overmind.state.foo).toBe('hm')
    })
  })

  test('tryCatch - resolves', () => {
    expect.assertions(1)
    const test = tryCatch({
      try: ({ state }: Context, value: string) => {
        state.foo = value
      },
      catch: () => {},
    })
    const state = {
      foo: 'bar',
    }
    const actions = {
      test,
    }
    const config = {
      state,
      actions,
    }
    const overmind = new Overmind(config)

    type Context = IContext<{
      state: typeof state
      actions: {
        test: typeof actions.test
      }
    }>

    return overmind.actions.test('baz').then(() => {
      expect(overmind.state.foo).toBe('baz')
    })
  })

  test('tryCatch - fails', () => {
    expect.assertions(1)
    const test = tryCatch({
      try: (() => {
        throw new Error('ehm')
      }) as (context: Context, payload: string) => void,
      catch: ({ state }: Context, value) => {
        state.foo = value.message
      },
    })

    const state = {
      foo: 'bar',
    }
    const actions = {
      test,
    }
    const config = {
      state,
      actions,
    }
    const overmind = new Overmind(config)

    type Context = IContext<{
      state: typeof state
      actions: {
        test: typeof actions.test
      }
    }>

    return overmind.actions.test('baz').then(() => {
      expect(overmind.state.foo).toBe('ehm')
    })
  })

  test('waitUntil', () => {
    expect.assertions(1)
    const increaseCount = pipe(({ state }: Context) => state.runCount++)
    const test = pipe(
      waitUntil((state: any) => state.runCount === 1),
      ({ state }: Context) => (state.hasRun = true)
    )
    const state = {
      runCount: 0,
      hasRun: false,
    }
    const actions = {
      increaseCount,
      test,
    }
    const config = {
      state,
      actions,
    }
    const overmind = new Overmind(config)

    type Context = IContext<{
      state: typeof state
      actions: {
        test: typeof actions.test
        increaseCount: typeof actions.increaseCount
      }
    }>

    setTimeout(() => {
      overmind.actions.increaseCount()
    }, 0)

    return overmind.actions.test().then(() => {
      expect(overmind.state.runCount).toBe(1)
    })
  })

  test('pipe - propagates error from throwing IS_OPERATOR instead of re-invoking', async () => {
    let callCount = 0
    const throwingOperator: any = (_err: any, _context: any, _next: any) => {
      callCount++
      throw new Error('sync throw')
    }
    throwingOperator[IS_OPERATOR] = true

    const state = {
      error: '',
    }

    const test = (pipe as any)(
      throwingOperator,
      catchError(({ state }: any, error: Error) => {
        state.error = error.message
        return 'caught'
      })
    )

    const actions = { test }

    const config = {
      state,
      actions,
    }

    const overmind = new Overmind(config) as any

    await overmind.actions.test()

    expect(callCount).toBe(1)
    expect(overmind.state.error).toBe('sync throw')
  })

  test('branch - propagates error from throwing IS_OPERATOR instead of re-invoking', async () => {
    let callCount = 0
    const throwingOperator: any = (_err: any, _context: any, _next: any) => {
      callCount++
      throw new Error('sync throw')
    }
    throwingOperator[IS_OPERATOR] = true

    const state = {
      error: '',
      value: '',
    }

    const test = (pipe as any)(
      (branch as any)(throwingOperator),
      catchError(({ state }: any, error: Error) => {
        state.error = error.message
        return 'caught'
      }),
      ({ state }: any, value: string) => {
        state.value = value
      }
    )

    const actions = { test }

    const config = {
      state,
      actions,
    }

    const overmind = new Overmind(config) as any

    await overmind.actions.test()

    expect(callCount).toBe(1)
    expect(overmind.state.error).toBe('sync throw')
  })
})
