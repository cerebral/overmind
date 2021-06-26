import { IContext, createOvermind } from 'overmind'

import { Statechart, statechart } from './'

describe('Statecharts', () => {
  test('should wrap configs', () => {
    const config = {}

    const chart: Statechart<
      typeof config,
      {
        foo: void
      }
    > = {
      initial: 'foo',
      states: {
        foo: {},
      },
    }
    const instance = createOvermind(
      statechart(config, {
        id1: chart,
      })
    )

    expect(instance.state.states).toEqual([['id1', 'foo']])
    expect(instance.state.actions).toEqual({})
    expect(
      instance.state.matches({
        id1: {
          foo: true,
        },
      })
    ).toEqual(true)
  })

  test('should allow root chart', () => {
    const config = {}

    const chart: Statechart<
      typeof config,
      {
        foo: void
      }
    > = {
      initial: 'foo',
      states: {
        foo: {},
      },
    }
    const instance = createOvermind(statechart(config, chart))

    expect(instance.state.states).toEqual([['CHART', 'foo']])
    expect(instance.state.actions).toEqual({})
    expect(
      instance.state.matches({
        foo: true,
      })
    ).toEqual(true)
  })

  test('should filter actions', () => {
    const increaseCount = ({ state }: Context) => {
      state.count++
    }

    const state = {
      count: 0,
    }
    const actions = {
      increaseCount,
    }

    const config = {
      state,
      actions,
    }

    const chart: Statechart<
      Context,
      {
        foo: void
        bar: void
      }
    > = {
      initial: 'foo',
      states: {
        foo: {
          on: {
            increaseCount: 'bar',
          },
        },
        bar: {},
      },
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>

    const instance = createOvermind(
      statechart(config, {
        id1: chart,
      })
    )

    expect(instance.state.states).toEqual([['id1', 'foo']])
    expect(instance.state.actions).toEqual({ increaseCount: true })
    expect(
      instance.state.matches({
        id1: {
          foo: true,
        },
      })
    ).toEqual(true)

    instance.actions.increaseCount()

    expect(instance.state.states).toEqual([['id1', 'bar']])
    expect(instance.state.actions).toEqual({ increaseCount: false })
    expect(
      instance.state.matches({
        id1: {
          bar: true,
        },
      })
    ).toEqual(true)
    expect(instance.state.count).toBe(1)
  })

  test('should run onInitializeOvermind action', () => {
    const onInitializeOvermind = ({ state }: Context) => {
      state.count++
    }

    const state = {
      count: 0,
    }
    const actions = {
      onInitializeOvermind,
    }

    const config = {
      state,
      actions,
    }

    const chart: Statechart<
      Context,
      {
        foo: void
      }
    > = {
      initial: 'foo',
      states: { foo: {} },
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>

    const instance = createOvermind(
      statechart(config, {
        id1: chart,
      })
    )

    expect(instance.state.states).toEqual([['id1', 'foo']])
    expect(instance.state.actions).toEqual({})
    expect(instance.state.count).toBe(1)
  })

  test('async onInitializeOvermind is finished before instance is initialized', async () => {
    const onInitializeOvermind = async ({ actions }: Context) => {
      await new Promise((resolve) => setTimeout(resolve, 250))
      await actions.increaseCount()
    }
    const increaseCount = async ({ state }: Context) => {
      state.count++
    }
    const state = {
      count: 0,
    }
    const actions = {
      onInitializeOvermind,
      increaseCount,
    }

    const config = {
      state,
      actions,
    }

    const chart: Statechart<
      Context,
      {
        foo: void
        bar: void
      }
    > = {
      initial: 'foo',
      states: {
        foo: {
          on: {
            increaseCount: 'bar',
          },
        },
        bar: {},
      },
    }

    type Context = IContext<{
      state: typeof state
      actions: {
        onInitializeOvermind: typeof actions.onInitializeOvermind
        increaseCount: typeof actions.increaseCount
      }
    }>

    const instance = createOvermind(
      statechart(config, {
        id1: chart,
      })
    )

    await instance.initialized
    expect(instance.state.states).toEqual([['id1', 'bar']])
    expect(instance.state.count).toBe(1)
  })

  test('should run entry action', () => {
    const increaseCount = ({ state }: Context) => {
      state.count++
    }
    const state = {
      count: 0,
    }
    const actions = {
      increaseCount,
    }
    const config = {
      state,
      actions,
    }

    const chart: Statechart<
      typeof config,
      {
        foo: void
      }
    > = {
      initial: 'foo',
      states: {
        foo: {
          entry: 'increaseCount',
        },
      },
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>

    const instance = createOvermind(
      statechart(config, {
        id1: chart,
      })
    )

    expect(instance.state.states).toEqual([['id1', 'foo']])
    expect(instance.state.actions).toEqual({ increaseCount: false })
    expect(
      instance.state.matches({
        id1: {
          foo: true,
        },
      })
    ).toEqual(true)
    expect(instance.state.count).toBe(1)
  })

  test('should run entry action of initial state when onInitializeOvermind is present', async () => {
    const onInitializeOvermind = ({ state }: Context) => {
      state.initCount++
    }
    const increaseCount = ({ state }: Context) => {
      state.actionCount++
    }
    const state = {
      actionCount: 0,
      initCount: 0,
    }
    const actions = {
      increaseCount,
      onInitializeOvermind,
    }
    const config = {
      state,
      actions,
    }

    const chart: Statechart<
      typeof config,
      {
        foo: void
      }
    > = {
      initial: 'foo',
      states: {
        foo: {
          entry: 'increaseCount',
        },
      },
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>

    const instance = createOvermind(
      statechart(config, {
        id1: chart,
      })
    )

    await instance.initialized
    expect(instance.state.states).toEqual([['id1', 'foo']])
    expect(instance.state.actions).toEqual({ increaseCount: false })
    expect(
      instance.state.matches({
        id1: {
          foo: true,
        },
      })
    ).toEqual(true)
    expect(instance.state.initCount).toBe(1)
    expect(instance.state.actionCount).toBe(1)
  })

  test('should run exit action', () => {
    const increaseCount = ({ state }: Context) => {
      state.count++
    }
    const changeToBar = () => {}

    const state = {
      count: 0,
    }
    const actions = {
      increaseCount,
      changeToBar,
    }
    const config = {
      state,
      actions,
    }

    const chart: Statechart<
      typeof config,
      {
        foo: void
        bar: void
      }
    > = {
      initial: 'foo',
      states: {
        foo: {
          exit: 'increaseCount',
          on: {
            changeToBar: 'bar',
          },
        },
        bar: {},
      },
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>

    const instance = createOvermind(
      statechart(config, {
        id1: chart,
      })
    )

    expect(instance.state.states).toEqual([['id1', 'foo']])
    expect(instance.state.actions).toEqual({
      increaseCount: false,
      changeToBar: true,
    })
    expect(
      instance.state.matches({
        id1: {
          foo: true,
        },
      })
    ).toEqual(true)

    instance.actions.changeToBar()

    expect(instance.state.states).toEqual([['id1', 'bar']])
    expect(instance.state.actions).toEqual({
      increaseCount: false,
      changeToBar: false,
    })
    expect(
      instance.state.matches({
        id1: {
          bar: true,
        },
      })
    ).toEqual(true)
    expect(instance.state.count).toBe(1)
  })

  test('should filter actions by condition', () => {
    const increaseCount = ({ state }: Context) => {
      state.count++
    }
    const changeToBar = () => {}

    const state = {
      count: 0,
    }
    const actions = {
      increaseCount,
      changeToBar,
    }
    const config = {
      state,
      actions,
    }

    const chart: Statechart<
      typeof config,
      {
        foo: void
        bar: void
      }
    > = {
      initial: 'foo',
      states: {
        foo: {
          on: {
            increaseCount: null,
            changeToBar: {
              target: 'bar',
              condition: (state) => state.count > 0,
            },
          },
        },
        bar: {},
      },
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>

    const instance = createOvermind(
      statechart(config, {
        id1: chart,
      })
    )

    expect(instance.state.states).toEqual([['id1', 'foo']])
    expect(instance.state.actions).toEqual({
      increaseCount: true,
      changeToBar: false,
    })
    expect(
      instance.state.matches({
        id1: {
          foo: true,
        },
      })
    ).toEqual(true)

    instance.actions.increaseCount()

    expect(instance.state.actions).toEqual({
      increaseCount: true,
      changeToBar: true,
    })

    instance.actions.changeToBar()

    expect(instance.state.states).toEqual([['id1', 'bar']])
    expect(instance.state.actions).toEqual({
      increaseCount: false,
      changeToBar: false,
    })
    expect(
      instance.state.matches({
        id1: {
          bar: true,
        },
      })
    ).toEqual(true)
  })

  test('should allow nesting', () => {
    const fooEntry = ({ state }: Context) => {
      state.transitions.push('fooEntry')
    }
    const fooExit = ({ state }: Context) => {
      state.transitions.push('fooExit')
    }
    const aEntry = ({ state }: Context) => {
      state.transitions.push('aEntry')
    }
    const aExit = ({ state }: Context) => {
      state.transitions.push('aExit')
    }
    const bExit = ({ state }: Context) => {
      state.transitions.push('bExit')
    }
    const changeToBar = () => {}
    const changeToB = () => {}

    const state = {
      transitions: [] as string[],
    }
    const actions = {
      fooEntry,
      fooExit,
      aEntry,
      aExit,
      bExit,
      changeToBar,
      changeToB,
    }
    const config = {
      state,
      actions,
    }

    const nestedChart: Statechart<
      typeof config,
      {
        a: {}
        b: {}
      }
    > = {
      initial: 'a',
      states: {
        a: {
          entry: 'aEntry',
          exit: 'aExit',
          on: {
            changeToB: 'b',
          },
        },
        b: {
          exit: 'bExit',
        },
      },
    }

    const chart: Statechart<
      typeof config,
      {
        foo: typeof nestedChart
        bar: void
      }
    > = {
      initial: 'foo',
      states: {
        foo: {
          entry: 'fooEntry',
          exit: 'fooExit',
          on: {
            changeToBar: 'bar',
          },
          chart: nestedChart,
        },
        bar: {},
      },
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>
    const instance = createOvermind(statechart(config, chart))

    expect(instance.state.states).toEqual([['CHART', 'foo', 'CHART', 'a']])
    expect(instance.state.matches({ foo: true }))
    expect(instance.state.matches({ foo: { a: true } }))
    expect(instance.state.actions).toEqual({
      fooEntry: false,
      fooExit: false,
      aEntry: false,
      aExit: false,
      bExit: false,
      changeToBar: true,
      changeToB: true,
    })
    expect(instance.state.transitions).toEqual(['aEntry', 'fooEntry'])
    instance.actions.changeToB()

    expect(instance.state.states).toEqual([['CHART', 'foo', 'CHART', 'b']])
    expect(instance.state.actions).toEqual({
      fooEntry: false,
      fooExit: false,
      aEntry: false,
      aExit: false,
      bExit: false,
      changeToBar: true,
      changeToB: false,
    })
    expect(instance.state.transitions).toEqual(['aEntry', 'fooEntry', 'aExit'])
    instance.actions.changeToBar()
    expect(instance.state.states).toEqual([['CHART', 'bar']])
    expect(instance.state.actions).toEqual({
      fooEntry: false,
      fooExit: false,
      aEntry: false,
      aExit: false,
      bExit: false,
      changeToBar: false,
      changeToB: false,
    })
    expect(instance.state.transitions).toEqual([
      'aEntry',
      'fooEntry',
      'aExit',
      'bExit',
      'fooExit',
    ])
  })

  test('should allow parallel state charts', () => {
    const increaseCount = ({ state }: Context) => {
      state.count++
    }
    const changeToBar = () => {}

    const state = {
      count: 0,
    }
    const actions = {
      increaseCount,
      changeToBar,
    }
    const config = {
      state,
      actions,
    }

    const chartA: Statechart<
      typeof config,
      {
        foo: void
        bar: void
      }
    > = {
      initial: 'bar',
      states: {
        foo: {},
        bar: {
          on: {
            increaseCount: null,
            changeToBar: 'foo',
          },
        },
      },
    }
    const chartB: Statechart<
      typeof config,
      {
        foo: void
        bar: void
      }
    > = {
      initial: 'foo',
      states: {
        foo: {
          on: {
            increaseCount: null,
            changeToBar: 'bar',
          },
        },
        bar: {},
      },
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>
    const instance = createOvermind(statechart(config, { chartA, chartB }))

    expect(instance.state.states).toEqual([
      ['chartA', 'bar'],
      ['chartB', 'foo'],
    ])
    expect(instance.state.actions).toEqual({
      increaseCount: true,
      changeToBar: true,
    })
    expect(
      instance.state.matches({
        chartA: {
          bar: true,
        },
        chartB: {
          foo: true,
        },
      })
    ).toEqual(true)

    instance.actions.increaseCount()

    expect(instance.state.actions).toEqual({
      increaseCount: true,
      changeToBar: true,
    })

    instance.actions.changeToBar()

    expect(instance.state.states).toEqual([
      ['chartA', 'foo'],
      ['chartB', 'bar'],
    ])
    expect(instance.state.actions).toEqual({
      increaseCount: false,
      changeToBar: false,
    })
    expect(
      instance.state.matches({
        chartA: {
          foo: true,
        },
        chartB: {
          bar: true,
        },
      })
    ).toEqual(true)
  })
  test('should allow nested parallel state charts', () => {
    const increaseCount = ({ state }: Context) => {
      state.count++
    }
    const changeToBar = () => {}

    const state = {
      count: 0,
    }
    const actions = {
      increaseCount,
      changeToBar,
    }
    const config = {
      state,
      actions,
    }

    const parallelChartA: Statechart<
      typeof config,
      {
        foo: void
        bar: void
      }
    > = {
      initial: 'bar',
      states: {
        foo: {},
        bar: {
          on: {
            increaseCount: null,
            changeToBar: 'foo',
          },
        },
      },
    }
    const nestedChartB: Statechart<
      typeof config,
      {
        foo: void
        bar: void
      }
    > = {
      initial: 'foo',
      states: {
        foo: {
          on: {
            increaseCount: null,
            changeToBar: 'bar',
          },
        },
        bar: {},
      },
    }
    const parallelChartB: Statechart<
      typeof config,
      {
        foo: {
          nestedChartB: typeof nestedChartB
        }
        bar: void
      }
    > = {
      initial: 'foo',
      states: {
        foo: {
          on: {
            increaseCount: null,
            changeToBar: 'bar',
          },
          chart: { nestedChartB },
        },
        bar: {},
      },
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>
    const instance = createOvermind(
      statechart(config, { parallelChartA, parallelChartB })
    )

    expect(instance.state.states).toEqual([
      ['parallelChartA', 'bar'],
      ['parallelChartB', 'foo', 'nestedChartB', 'foo'],
    ])
    expect(instance.state.actions).toEqual({
      increaseCount: true,
      changeToBar: true,
    })
    expect(
      instance.state.matches({
        parallelChartA: {
          bar: true,
        },
        parallelChartB: {
          foo: {
            nestedChartB: {
              foo: true,
            },
          },
        },
      })
    ).toEqual(true)

    instance.actions.increaseCount()

    expect(instance.state.actions).toEqual({
      increaseCount: true,
      changeToBar: true,
    })

    instance.actions.changeToBar()

    expect(instance.state.states).toEqual([
      ['parallelChartA', 'foo'],
      ['parallelChartB', 'bar'],
    ])
    expect(instance.state.actions).toEqual({
      increaseCount: false,
      changeToBar: false,
    })
    expect(
      instance.state.matches({
        parallelChartA: {
          foo: true,
        },
        parallelChartB: {
          foo: false,
        },
      })
    ).toEqual(true)
  })
  test('should run entry and exit of parallel charts', () => {
    const increaseCount = ({ state }: Context) => {
      state.count++
    }
    const changeToBar = () => {}

    const state = {
      count: 0,
    }
    const actions = {
      increaseCount,
      changeToBar,
    }
    const config = {
      state,
      actions,
    }

    const chart: Statechart<
      typeof config,
      {
        baz: void
      }
    > = {
      initial: 'baz',
      states: {
        baz: {
          entry: 'increaseCount',
          exit: 'increaseCount',
        },
      },
    }

    const chartB: Statechart<
      typeof config,
      {
        baz: void
      }
    > = {
      initial: 'baz',
      states: {
        baz: {
          entry: 'increaseCount',
        },
      },
    }

    const mainChart: Statechart<
      typeof config,
      {
        foo: {
          chart: typeof chart
          chartB: typeof chartB
        }
        bar: void
      }
    > = {
      initial: 'foo',
      states: {
        foo: {
          on: {
            changeToBar: 'bar',
          },
          chart: { chart, chartB },
        },
        bar: {},
      },
    }

    type Context = IContext<{
      state: typeof state
      actions: typeof actions
    }>

    const instance = createOvermind(statechart(config, { mainChart }))

    expect(instance.state.states).toEqual([
      ['mainChart', 'foo', 'chart', 'baz'],
      ['mainChart', 'foo', 'chartB', 'baz'],
    ])
    expect(instance.state.actions).toEqual({
      increaseCount: false,
      changeToBar: true,
    })
    expect(
      instance.state.matches({
        mainChart: {
          foo: {
            chart: {
              baz: true,
            },
            chartB: {
              baz: true,
            },
          },
        },
      })
    ).toEqual(true)
    expect(instance.state.count).toBe(2)
    instance.actions.changeToBar()
    expect(instance.state.states).toEqual([['mainChart', 'bar']])
    expect(instance.state.actions).toEqual({
      increaseCount: false,
      changeToBar: false,
    })
    expect(
      instance.state.matches({
        mainChart: {
          foo: {
            chart: {
              baz: true,
            },
          },
        },
      })
    ).toEqual(false)
    expect(instance.state.count).toBe(3)
  })

  test('should run entry and exit actions when transitioning within a transition', async () => {
    const step = async ({ state, actions }: Context) => {
      state.actionEvents.push('step')
      await Promise.resolve()
      actions.step2()
    }
    const step2 = ({ state }: Context) => {
      state.actionEvents.push('step2')
    }
    const entry = ({ state }: Context) => {
      state.actionEvents.push('entry')
    }
    const exit = ({ state }: Context) => {
      state.actionEvents.push('exit')
    }

    const state = {
      actionEvents: [] as string[],
    }
    const actions = {
      step,
      step2,
      entry,
      exit,
    }
    const config = {
      state,
      actions,
    }

    const chart: Statechart<
      typeof config,
      {
        foo: void
        bar: void
        baz: void
      }
    > = {
      initial: 'foo',
      states: {
        foo: {
          on: {
            step: 'bar',
          },
          exit: 'exit',
        },
        bar: {
          entry: 'entry',
          on: {
            step2: 'baz',
          },
        },
        baz: {},
      },
    }

    type Context = IContext<{
      state: typeof state
      actions: {
        step: typeof actions.step
        step2: typeof actions.step2
        entry: typeof actions.entry
        exit: typeof actions.exit
      }
    }>

    const instance = createOvermind(
      statechart(config, {
        id1: chart,
      })
    )

    await instance.actions.step()

    expect(instance.state.actionEvents).toEqual([
      'exit',
      'step',
      'entry',
      'step2',
    ])
  })
})
