import {
  Overmind,
  pipe,
  map,
  forEach,
  filter,
  fork,
  when,
  IOperator,
  wait,
  debounce,
  action,
  parallel,
  IConfig,
  IAction,
} from './'

describe('OPERATORS', () => {
  test('map', () => {
    expect.assertions(1)
    const test: Operator<string> = pipe(
      map(({ value }) => value.toUpperCase()),
      action(({ value, state }) => (state.foo = value))
    )

    const state = {
      foo: 'bar',
    }

    const config = {
      state,
      actions: {
        test,
      },
    }
    const overmind = new Overmind(config)

    type Config = IConfig<typeof config>

    interface Operator<Input = void, Output = Input>
      extends IOperator<Config, Input, Output> {}

    return overmind.actions.test('foo').then(() => {
      expect(overmind.state.foo).toBe('FOO')
    })
  })

  test('map (async)', () => {
    expect.assertions(1)
    const test: Operator<string> = pipe(
      map(({ value }) => Promise.resolve(value.toUpperCase())),
      action(({ value, state }) => (state.foo = value))
    )

    const state = {
      foo: 'bar',
    }

    const config = {
      state,
      actions: {
        test,
      },
    }
    const overmind = new Overmind(config)

    type Config = IConfig<typeof config>

    interface Operator<Input = void, Output = Input>
      extends IOperator<Config, Input, Output> {}

    interface Action<Input = void> extends IAction<Config, Input> {}

    return overmind.actions.test('foo').then(() => {
      expect(overmind.state.foo).toBe('FOO')
    })
  })

  test('forEach', () => {
    expect.assertions(1)
    let runCount = 0
    const test: Operator<string[]> = pipe(
      forEach((_, val, next) => {
        runCount++
        next(null, val)
      })
    )

    const config = {
      actions: {
        test,
      },
    }
    const overmind = new Overmind(config)

    type Config = IConfig<typeof config>

    interface Operator<Input = void, Output = Input>
      extends IOperator<Config, Input, Output> {}

    interface Action<Input = void> extends IAction<Config, Input> {}

    return overmind.actions.test(['foo']).then(() => {
      expect(runCount).toEqual(1)
    })
  })

  test('parallel', () => {
    expect.assertions(1)
    let runCount = 0
    const test: Operator<string> = pipe(
      parallel(
        (_, value, next) => {
          runCount++
          next(null, value)
        },
        (_, value, next) => {
          runCount++
          next(null, value)
        }
      )
    )

    const config = {
      actions: {
        test,
      },
    }
    const overmind = new Overmind(config)

    type Config = IConfig<typeof config>

    interface Operator<Input = void, Output = Input>
      extends IOperator<Config, Input, Output> {}

    interface Action<Input = void> extends IAction<Config, Input> {}

    return overmind.actions.test('foo').then(() => {
      expect(runCount).toEqual(2)
    })
  })

  test('filter - truthy', () => {
    expect.assertions(1)
    const test: Operator<string> = pipe(
      filter(({ value }) => value === 'foo'),
      map(({ value }) => value.toUpperCase()),
      action(({ value, state }) => (state.foo = value))
    )

    const state = {
      foo: 'bar',
    }
    const config = {
      state,
      actions: {
        test,
      },
    }
    const overmind = new Overmind(config)

    type Config = IConfig<typeof config>

    interface Operator<Input = void, Output = Input>
      extends IOperator<Config, Input, Output> {}

    interface Action<Input = void> extends IAction<Config, Input> {}

    return overmind.actions.test('foo').then(() => {
      expect(overmind.state.foo).toBe('FOO')
    })
  })

  test('filter - falsy', () => {
    const test: Operator<string> = pipe(
      filter(({ value }) => value === 'bar'),
      map(({ value }) => value.toUpperCase()),
      action(({ value, state }) => (state.foo = value))
    )

    const state = {
      foo: 'bar',
    }
    const config = {
      state,
      actions: {
        test,
      },
    }
    const overmind = new Overmind(config)

    type Config = IConfig<typeof config>

    interface Operator<Input = void, Output = Input>
      extends IOperator<Config, Input, Output> {}

    interface Action<Input = void> extends IAction<Config, Input> {}

    return overmind.actions.test('foo').then(() => {
      expect(overmind.state.foo).toBe('bar')
    })
  })

  test('fork', () => {
    expect.assertions(1)
    const test: Operator<string> = pipe(
      fork(() => 'foo', {
        foo: pipe(
          map(({ value }) => value.toUpperCase()),
          action(({ value, state }) => (state.foo = value))
        ),
      })
    )

    const state = {
      foo: 'bar',
    }
    const config = {
      state,
      actions: {
        test,
      },
    }
    const overmind = new Overmind(config)

    type Config = IConfig<typeof config>

    interface Operator<Input = void, Output = Input>
      extends IOperator<Config, Input, Output> {}

    interface Action<Input = void> extends IAction<Config, Input> {}

    return overmind.actions.test('foo').then(() => {
      expect(overmind.state.foo).toBe('FOO')
    })
  })

  test('when', () => {
    expect.assertions(1)
    const test: Operator<string, string | number> = pipe(
      when(() => true, {
        true: pipe(
          map(({ value }) => value.toUpperCase()),
          action(({ value, state }) => (state.foo = value))
        ),
        false: pipe(
          map(({ value }) => Number(value)),
          action(({ value, state }) => (state.number = value))
        ),
      })
    )

    const state = {
      foo: 'bar',
      number: 0,
    }
    const config = {
      state,
      actions: {
        test,
      },
    }
    const overmind = new Overmind(config)

    type Config = IConfig<typeof config>

    interface Operator<Input = void, Output = Input>
      extends IOperator<Config, Input, Output> {}

    interface Action<Input = void> extends IAction<Config, Input> {}

    return overmind.actions.test('foo').then(() => {
      expect(overmind.state.foo).toBe('FOO')
    })
  })

  test('wait', () => {
    expect.assertions(1)
    const runTime = Date.now()
    const test: Operator = wait(500)

    const config = {
      actions: {
        test,
      },
    }
    const overmind = new Overmind(config)

    type Config = IConfig<typeof config>

    interface Operator<Input = void, Output = Input>
      extends IOperator<Config, Input, Output> {}

    interface Action<Input = void> extends IAction<Config, Input> {}

    return overmind.actions.test().then(() => {
      expect(Date.now() - runTime).toBeGreaterThanOrEqual(500)
    })
  })

  test('debounce', () => {
    expect.assertions(1)
    const test: Operator = pipe(
      debounce(100),
      action(({ state }) => state.runCount++)
    )
    const state = {
      runCount: 0,
    }
    const config = {
      state,
      actions: {
        test,
      },
    }
    const overmind = new Overmind(config)

    type Config = IConfig<typeof config>

    interface Operator<Input = void, Output = Input>
      extends IOperator<Config, Input, Output> {}

    interface Action<Input = void> extends IAction<Config, Input> {}

    return Promise.all([overmind.actions.test(), overmind.actions.test()]).then(
      () => {
        expect(overmind.state.runCount).toBe(1)
      }
    )
  })
})
