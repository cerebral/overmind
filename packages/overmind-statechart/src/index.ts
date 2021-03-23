import { ENVIRONMENT, IConfiguration, derived, filter, pipe } from 'overmind'

const ACTIONS = 'ACTIONS'
const CHART = 'CHART'

export interface Statechart<
  C extends IConfiguration,
  S extends {
    [state: string]: Statecharts | Statechart<any, any> | void
  }
> {
  initial: keyof S
  states: {
    [N in keyof S]: {
      entry?: keyof C['actions']
      exit?: keyof C['actions']
      chart?: S[N]
      on?: {
        [N in keyof C['actions']]?:
          | keyof S
          | {
              target: keyof S
              condition: (state: C['state']) => boolean
            }
          | null
      }
    }
  }
}

interface Statecharts {
  [id: string]: Statechart<any, any>
}

function isRootChart(chart) {
  return 'initial' in chart && 'states' in chart
}

function forceNestedCharts(charts: Statecharts | Statechart<any, any>) {
  if (isRootChart(charts)) {
    charts = { [CHART]: charts } as Statecharts
  }

  return Object.keys(charts).reduce((aggr, chartKey) => {
    aggr[chartKey] = {
      ...charts[chartKey],
      states: Object.keys(charts[chartKey].states).reduce(
        (statesAggr, stateKey) => {
          if (charts[chartKey].states[stateKey].chart) {
            statesAggr[stateKey] = {
              ...charts[chartKey].states[stateKey],
              chart: forceNestedCharts(charts[chartKey].states[stateKey].chart),
            }
          } else {
            statesAggr[stateKey] = charts[chartKey].states[stateKey]
          }

          return statesAggr
        },
        {}
      ),
    }

    return aggr
  }, {})
}

function getActionTransitions(
  actionName: string,
  charts: Statecharts,
  state: { states: Array<(string | number)[]> }
) {
  const transitions: Array<{ index: number; target?: string }> = []

  state.states.forEach((statePath, index) => {
    const path = statePath.slice()

    while (path.length) {
      const target = getStateTarget(charts, path)

      if (target.on && target.on[actionName] === null) {
        transitions.push({ index })
        return
      }

      if (
        target.on &&
        typeof target.on[actionName] === 'string' &&
        !transitions.find(
          (transition) => transition.target === target.on[actionName]
        )
      ) {
        transitions.push({ index, target: target.on[actionName] })
        return
      }

      if (
        target.on &&
        target.on[actionName] &&
        target.on[actionName].target &&
        !transitions.find(
          (transition) => transition.target === target.on[actionName].target
        ) &&
        target.on[actionName].condition(state)
      ) {
        transitions.push({
          index,
          target: target.on[actionName].target,
        })
        return
      }

      path.pop()
    }
  })

  return transitions
}

function getCanTransitionActions(actions, charts, state) {
  return Object.keys(actions || {}).reduce((aggr, key) => {
    aggr[key] = Boolean(getActionTransitions(key, charts, state).length)

    return aggr
  }, {})
}

function getMatchPaths(matches, paths: Array<string[]> = [[]]) {
  const initialPath = paths[paths.length - 1].slice()

  Object.keys(matches).forEach((matchKey, index) => {
    const match = matches[matchKey]

    if (index > 0) {
      paths.push(initialPath.slice())
    }

    paths[paths.length - 1].push(matchKey)

    if (typeof match !== 'boolean') {
      getMatchPaths(match, paths)
    }
  })

  return paths
}

function getInitialStates(charts: Statecharts, paths: Array<string[]> = [[]]) {
  const initialPath = paths[paths.length - 1].slice()

  Object.keys(charts).forEach((chartKey, index) => {
    const chart = charts[chartKey]

    if (index > 0) {
      paths.push(initialPath.slice())
    }

    paths[paths.length - 1].push(chartKey)
    paths[paths.length - 1].push(chart.initial as string)

    const nestedChart = chart.states[chart.initial as string].chart
    if (nestedChart && isRootChart(nestedChart)) {
      getInitialStates(
        {
          [CHART]: nestedChart,
        } as Statecharts,
        paths
      )
    } else if (nestedChart) {
      getInitialStates(nestedChart as Statecharts, paths)
    }
  })

  return paths
}

function createNewStatePath(
  currentStates: Array<string[]>,
  transitionStates: string[],
  charts: Statecharts,
  index: number
) {
  const newStatePath: string[] = []
  let x = 0
  let transitionState = transitionStates.shift()

  // Keep existing state before transition
  while (!transitionState && transitionStates.length) {
    newStatePath.push(currentStates[index][x])
    transitionState = transitionStates.shift()
    x++
  }

  if (!transitionState) {
    return currentStates[index]
  }

  // Add the new transition
  newStatePath.push(transitionState)

  const stateTarget = getStateTarget(charts, newStatePath)

  // If we have more nested state, go grab the initial states
  if (stateTarget.chart) {
    return newStatePath.concat(getInitialStates(stateTarget.chart)[index])
  }

  return newStatePath
}

function getTarget(source, path) {
  return path.reduce((aggr, key) => aggr[key], source)
}

function getStateTarget(charts, path) {
  return path.reduce((aggr, key, index) => {
    const isChart = index % 2

    if (!isChart) {
      return aggr[key]
    }

    if (index === path.length - 1) {
      return aggr.states[key]
    }

    return aggr.states[key].chart
  }, charts)
}

type Match<T extends Statecharts | Statechart<any, any>> = T extends Statecharts
  ? {
      [I in keyof T]?: {
        [S in keyof T[I]['states']]?: T[I]['states'][S]['chart'] extends void
          ? boolean
          : boolean | Match<T[I]['states'][S]['chart']>
      }
    }
  : T extends Statechart<any, any>
  ? {
      [S in keyof T['states']]?: T['states'][S]['chart'] extends void
        ? boolean
        : boolean | Match<T['states'][S]['chart']>
    }
  : never

export function statechart<
  C extends IConfiguration,
  Charts extends Statecharts | Statechart<any, any>
>(
  config: C,
  chartDefinition: Charts
): {
  state: C['state'] & {
    states: Array<(string | number)[]>
    actions: { [N in keyof C['actions']]: boolean }
    matches: (match: Match<Charts>) => boolean
  }
  actions: C['actions']
  effects: C['effects']
} {
  let currentInstance

  const charts = forceNestedCharts(chartDefinition)
  const actions = config.actions || {}
  const state = config.state || {}

  if (
    currentInstance !== undefined &&
    config.state &&
    (config.state as any).states
  ) {
    throw new Error(
      `Overmind statecharts: You have already defined the state "states" in your configuration. Statecharts needs this, please rename it`
    )
  }

  if (
    currentInstance !== undefined &&
    config.state &&
    (config.state as any).matches
  ) {
    throw new Error(
      `Overmind statecharts: You have already defined the state "matches" in your configuration. Statecharts needs this, please rename it`
    )
  }

  let currentTransitionAction: string | null = null

  // @ts-ignore
  const onInitializeOvermindAction = actions.onInitializeOvermind
  const copiedActions = { ...actions }
  // @ts-ignore
  delete copiedActions.onInitializeOvermind

  const initialActions = {
    [ACTIONS]: copiedActions,
    onInitializeOvermind: (async (context, instance) => {
      if (onInitializeOvermindAction) {
        await onInitializeOvermindAction(context, instance)
      }

      currentInstance = instance
      const stateTarget = getTarget(
        context.state,
        context.execution.namespacePath
      )
      const actionsTarget = getTarget(
        context.actions,
        context.execution.namespacePath
      )

      const statePaths = stateTarget.states.slice()

      // Run entry actions of initial state
      statePaths.forEach((statePath) => {
        const state = statePath.slice()
        while (state.length) {
          const target = getStateTarget(charts, state)

          if (config.actions && config.actions[target.entry]) {
            actionsTarget[ACTIONS][target.entry](context)
          }

          state.pop()
        }
      })

      if (ENVIRONMENT === 'development' && instance.devtools) {
        instance.devtools.send({
          type: 'chart',
          data: {
            path: context.execution.namespacePath,
            states: getInitialStates(charts),
            charts: charts,
            actions: getCanTransitionActions(
              copiedActions,
              charts,
              stateTarget
            ),
          },
        })
      }
    }) as any,
  }

  return {
    state: Object.assign(state, {
      states: getInitialStates(charts),
      actions: derived((state) =>
        getCanTransitionActions(copiedActions, charts, state)
      ) as any,
      matches: derived((state: any) => (match) => {
        const matchPaths = getMatchPaths(match)
        const statesWithoutRootChartIndicator = state.states.map((statePath) =>
          statePath.filter((path) => path !== CHART)
        )

        for (let x = 0; x < matchPaths.length; x++) {
          const matchPath = matchPaths[x]
          const shouldMatch = matchPath.reduce((aggr, key) => aggr[key], match)
          const hasMatch = statesWithoutRootChartIndicator.reduce(
            (aggr, statePath) => {
              if (aggr) {
                return aggr
              }

              return matchPath.reduce((aggr, path, index) => {
                if (!aggr) {
                  return aggr
                }

                return path === statePath[index]
              }, true)
            },
            false
          )

          if (shouldMatch !== hasMatch) {
            return false
          }
        }

        return true
      }),
    }),
    actions: Object.keys(copiedActions).reduce((aggr, key) => {
      aggr[key] = pipe(
        function getTransition({ state, execution }: any, payload) {
          const stateTarget = getTarget(state, execution.namespacePath)
          const canTransition = stateTarget.actions[key]
          if (currentTransitionAction && !canTransition) {
            console.warn(
              `Overmind Statecharts: Transition action "${currentTransitionAction}" is calling transition action "${key}" synchronously. The previous transition is not done yet and "${key}" will be ignored. Consider calling it asynchronously `
            )
          } else if (!canTransition && ENVIRONMENT === 'development') {
            console.warn(
              `You tried to call action "${key}", but it was blocked by the statechart. You are not supposed to call this action in the current state of the chart. This warning only appear during development`
            )
          }

          return {
            canTransition,
            payload,
          }
        },
        filter(function canTransition(_, payload) {
          return payload.canTransition
        }),
        function runAction(context: any, { payload }) {
          const stateTarget = getTarget(
            context.state,
            context.execution.namespacePath
          )
          const actionsTarget = getTarget(
            context.actions,
            context.execution.namespacePath
          )
          const transitionActions = getActionTransitions(
            key,
            charts,
            stateTarget
          )

          // If there are no new transition target, just drop moving on, just run the action
          if (
            !transitionActions.some(
              (transitionAction) => transitionAction.target
            )
          ) {
            if (config.actions) {
              return actionsTarget[ACTIONS][key](payload)
            }
            return
          }

          const exitActions: string[] = []
          const entryActions: string[] = []
          const newStates: Array<string[]> = []

          transitionActions.forEach((transitionAction) => {
            // It is an action that does not cause a transition
            if (!transitionAction.target) {
              return
            }

            const currentStatePath = stateTarget.states[
              transitionAction.index
            ].slice()
            const stateTransitions = currentStatePath.map(() => null)

            // Build new transition path
            while (currentStatePath.length) {
              const target = getStateTarget(charts, currentStatePath)

              // Collect the new transition state
              if (target.on && target.on[key]) {
                stateTransitions[currentStatePath.length - 1] =
                  target.on[key].target || target.on[key]
              }

              currentStatePath.pop()
            }

            const newStatePath = createNewStatePath(
              stateTarget.states,
              stateTransitions,
              charts,
              transitionAction.index
            )

            // Go down old path and trigger exits where the state has changed
            const traverseOldPath = stateTarget.states[
              transitionAction.index
            ].slice()

            while (traverseOldPath.length) {
              const target = getStateTarget(charts, traverseOldPath)

              if (
                target.exit &&
                newStatePath[traverseOldPath.length - 1] !==
                  traverseOldPath[traverseOldPath.length - 1]
              ) {
                exitActions.push(target.exit)
              }

              traverseOldPath.pop()
            }

            newStates.push(newStatePath.slice())

            // Go down new path and trigger any entry on new states
            const traverseNewPath = newStatePath.slice()
            while (traverseNewPath.length) {
              const target = getStateTarget(charts, traverseNewPath)

              if (
                target.entry &&
                newStatePath[traverseNewPath.length - 1] !==
                  stateTarget.states[transitionAction.index][
                    traverseNewPath.length - 1
                  ]
              ) {
                entryActions.push(target.entry)
              }

              traverseNewPath.pop()
            }
          })

          // Run exits
          exitActions.forEach((exitAction) => {
            if (config.actions) {
              actionsTarget[ACTIONS][exitAction](payload)
            }
          })

          currentTransitionAction = key
          let actionResult
          if (config.actions) {
            actionResult = actionsTarget[ACTIONS][key](payload)
          }

          currentTransitionAction = null

          // Transition to new state
          stateTarget.states = newStates

          // Run entry actions
          entryActions.forEach((entryAction) => {
            if (config.actions) {
              actionsTarget[ACTIONS][entryAction](payload)
            }
          })

          if (
            ENVIRONMENT === 'development' &&
            currentInstance &&
            currentInstance.devtools
          ) {
            currentInstance.devtools.send({
              type: 'chart',
              data: {
                path: context.execution.namespacePath,
                states: stateTarget.states,
                charts: charts,
                actions: getCanTransitionActions(
                  config.actions,
                  charts,
                  stateTarget
                ),
              },
            })
          }

          return actionResult
        }
      )

      return aggr
    }, initialActions),
    effects: config.effects || {},
  }
}
