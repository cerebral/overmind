import { createOperator, createMutationOperator } from './operator'
import {
  Overmind,
  IOperator,
  pipe,
  IContext,
  OperatorContextFunction,
} from './'

describe('OPERATOR', () => {
  test('should be able to create an operator', () => {
    expect.assertions(1)
    function toUpperCase(): IOperator<string, string> {
      return createOperator('toUpperCase', '', (err, _, value, next) => {
        if (err) next(err, value)
        else next(null, value.toUpperCase())
      })
    }

    const test = pipe(
      ({ state }: Context) => state.foo,
      toUpperCase(),
      ({ state }: Context, val) => {
        state.foo = val
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
      expect(overmind.state.foo).toBe('BAR')
    })
  })
  test('should be able to create an ERROR operator', () => {
    let operatorsRun = 0

    expect.assertions(2)
    function catchError<T>(operation: (error: Error) => void): IOperator<T, T> {
      return createOperator(
        'catchError',
        operation.name,
        (err, _, value, next) => {
          if (err) next(null, operation(err))
          else next(null, value)
        }
      )
    }

    const test = pipe(
      () => {
        throw new Error('wut')
      },
      () => {
        operatorsRun++
      },
      catchError((err) => {
        expect(err.message).toBe('wut')
      })
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

    return overmind.actions.test().then(() => {
      expect(operatorsRun).toBe(0)
    })
  })
  test('should be able to create an operator managing paths', () => {
    expect.assertions(1)
    function whenBananaOrApple<K>(paths: {
      banana: OperatorContextFunction<'banana', K>
      apple: OperatorContextFunction<'apple', K>
    }): IOperator<'banana' | 'apple', K> {
      return createOperator('whenBananaOrApple', '', (err, _, value, next) => {
        if (err) next(err, value)
        else
          next(null, value, {
            path: {
              name: value,
              operator: paths[value],
            },
          })
      })
    }

    const test = whenBananaOrApple({
      banana: ({ state }: Context) => {
        state.foo = 'banana'
      },
      apple: ({ state }: Context) => {
        state.foo = 'apple'
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

    return overmind.actions.test('banana').then(() => {
      expect(overmind.state.foo).toBe('banana')
    })
  })
  test('should be able to create an operator that can mutate', () => {
    expect.assertions(1)
    function changeState<T>(operation: (state: {}) => void): IOperator<T, T> {
      return createMutationOperator<{ state: {} }>(
        'changeState',
        operation.name,
        (err, context, value, next) => {
          if (err) next(err, value)
          else {
            operation(context.state)
            next(null, value)
          }
        }
      )
    }

    const test = changeState((state: Context['state']) => {
      state.foo = 'hihihi'
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
      actions: typeof actions
    }>

    return overmind.actions.test().then(() => {
      expect(overmind.state.foo).toBe('hihihi')
    })
  })
  test('should be able to create an operator that can track mutations', (done) => {
    function waitForMutation<T>(
      operation: (state: {}) => void
    ): IOperator<T, T> {
      return createOperator(
        'waitForMutation',
        operation.name,
        (err, context, value, next) => {
          if (err) next(err, value)
          else {
            const tree = context.execution.getTrackStateTree()
            tree.trackScope(
              () => {
                operation(tree.state)
              },
              () => {
                tree.dispose()
                next(null, value)
              }
            )
          }
        }
      )
    }

    const waitForFoo = waitForMutation((state: Context['state']) => {
      state.foo
    })

    const test = pipe(waitForFoo)

    const mutateFoo = ({ state }: Context) => {
      state.foo = 'hihihi'
    }

    const state = {
      foo: 'bar',
    }
    const actions = {
      test,
      mutateFoo,
    }
    const config = {
      state,
      actions,
    }
    const overmind = new Overmind(config)

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>

    overmind.actions.test().then(done)

    // Trigger mutation with an action.
    overmind.actions.mutateFoo()
  })
  test('should be able to create an operator that evaluates mutations', (done) => {
    function waitUntilTrue<T>(
      operation: (state: {}) => boolean
    ): IOperator<T, T> {
      return createOperator(
        'waitUntilTrue',
        operation.name,
        (err, context, value, next) => {
          if (err) next(err, value)
          else {
            const tree = context.execution.getTrackStateTree()
            const test = () => {
              if (operation(tree.state)) {
                tree.dispose()
                next(null, value)
              }
            }
            tree.trackScope(test, test)
          }
        }
      )
    }

    const waitForFoo = waitUntilTrue(
      (state: Context['state']) => state.foo.bar === 'hihihi'
    )

    const test = pipe(waitForFoo)

    const mutateBar = ({ state }: Context) => {
      state.foo.bar = 'hihihi'
    }

    const state = {
      foo: {
        bar: 'baz',
      },
    }

    const actions = {
      test,
      mutateBar,
    }

    const config = {
      state,
      actions,
    }
    const overmind = new Overmind(config)

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>

    overmind.actions.test().then(done)

    // Trigger mutation with an action.
    overmind.actions.mutateBar()
  })
})
