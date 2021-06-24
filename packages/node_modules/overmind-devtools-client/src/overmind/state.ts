import { derived } from 'overmind'
import {
  Action,
  App,
  Apps,
  Component,
  Flush,
  GroupedComponents,
  Tab,
  HistoryRecord,
  ExecutionType,
  MutationsMessage,
  HistoryRecordType,
  MutationHistoryRecord,
  FlushMessage,
  FlushHistoryRecord,
  EffectMessage,
  EffectHistoryRecord,
  OperatorsByPath,
  Chart,
  ActionsListItemType,
} from './types'

type State = {
  isConnecting: boolean
  error: string
  port: number
  apps: Apps
  currentAppName: string
  newPortValue: string
  currentTab: Tab
  showApps: boolean
  currentAction: Action
  currentChart: Chart
  currentApp: App
  componentsMounted: Component[]
  componentsUpdateCount: number
  componentsStatePathCount: number
  flushes: Flush[]
  flushesMutationsCount: number
  flushesStatePathCount: number
  groupedComponents: GroupedComponents
  history: HistoryRecord[]
  hasActionsError: boolean
  actionsCount: number
  currentOperatorsByPath: OperatorsByPath[]
  isShowingRuntime: boolean
  actionsSplitSize: number
  chartsSplitSize: number
  isExecutingAction: boolean
}

const state: State = {
  isShowingRuntime: false,
  isConnecting: true,
  error: null,
  showApps: false,
  currentAppName: null,
  actionsSplitSize: 200,
  chartsSplitSize: 200,
  port: 3031,
  apps: {},
  newPortValue: '',
  currentTab: Tab.State,
  isExecutingAction: false,
  currentApp: derived((state: State) => {
    return state.apps[state.currentAppName]
  }),
  actionsCount: derived((state: State) => {
    if (!state.currentApp) return 0
    return state.currentApp.actionsList.reduce(
      (aggr, item) =>
        aggr +
        (item.type === ActionsListItemType.ACTION ? 1 : item.actionIds.length),
      0
    )
  }),
  hasActionsError: derived((state: State) => {
    return Boolean(
      state.currentApp &&
        Object.values(state.currentApp.actions).some(
          (action) => action.hasError
        )
    )
  }),
  componentsMounted: derived((state: State) =>
    Object.keys(state.currentApp.components).reduce(
      (aggr, key) => {
        if (state.currentApp.components[key].isMounted) {
          return aggr.concat(state.currentApp.components[key])
        }

        return aggr
      },
      [] as Component[]
    )
  ),
  componentsUpdateCount: derived((state: State) =>
    state.componentsMounted.reduce(
      (aggr, component) => aggr + component.updateCount,
      0
    )
  ),
  componentsStatePathCount: derived((state: State) =>
    state.componentsMounted.reduce(
      (aggr, component) => aggr + component.paths.length,
      0
    )
  ),
  flushes: derived((state: State) =>
    Object.keys(state.currentApp.flushes)
      .sort(
        (idA, idB) =>
          state.currentApp.flushes[idB].flushId -
          state.currentApp.flushes[idA].flushId
      )
      .map((id) => state.currentApp.flushes[id])
  ),
  flushesMutationsCount: derived((state: State) =>
    state.flushes.reduce((aggr, flush) => aggr + flush.mutations.length, 0)
  ),
  flushesStatePathCount: derived(
    (state: State) =>
      state.flushes.reduce((aggr, flush) => {
        return flush.mutations.reduce(
          (aggr, mutation) =>
            aggr.includes(mutation.path) ? aggr : aggr.concat(mutation.path),
          aggr
        )
      }, []).length
  ),
  currentAction: derived(
    (state: State) => state.currentApp.actions[state.currentApp.currentActionId]
  ),
  currentChart: derived(
    (state: State) => state.currentApp.charts[state.currentApp.currentChartId]
  ),
  groupedComponents: derived((state: State) => {
    const components = state.componentsMounted

    return components.reduce(
      (aggr, component) => {
        if (aggr[component.name]) {
          aggr[component.name].components.push(component)
        } else {
          aggr[component.name] = {
            name: component.name,
            components: [component],
            isCollapsed: !state.currentApp.expandedComponents.includes(
              component.name
            ),
          }
        }

        return aggr
      },
      {} as GroupedComponents
    )
  }),
  history: derived((state: State) => {
    return state.currentApp.messages.reduce((aggr, message) => {
      switch (message.type) {
        case ExecutionType.MUTATIONS: {
          const mutationsMessage = message as MutationsMessage

          return aggr.concat(
            mutationsMessage.data.mutations.map((mutation) => {
              const mutationRecord: MutationHistoryRecord = {
                type: HistoryRecordType.Mutation,
                data: mutation,
                actionName: mutationsMessage.data.actionName,
              }

              return mutationRecord
            })
          )
        }
        case ExecutionType.FLUSH: {
          const flushMessage = message as FlushMessage
          const flush = state.currentApp.flushes[flushMessage.data.flushId]
          const flushRecord: FlushHistoryRecord = {
            type: HistoryRecordType.Flush,
            data: {
              ...flushMessage.data,
              components: flush.components.map(
                (componentId) => state.currentApp.components[componentId].name
              ),
              derived: flush.derived.map(
                (derivedId) => state.currentApp.derived[derivedId]
              ),
              isCollapsed: true,
            },
            actionName: flushMessage.data.actionName,
          }

          return aggr.concat(flushRecord)
        }
        case ExecutionType.EFFECT: {
          const effectMessage = message as EffectMessage
          const effectRecord: EffectHistoryRecord = {
            type: HistoryRecordType.Effect,
            data: effectMessage.data,
            actionName: effectMessage.data.actionName,
          }

          return aggr.concat(effectRecord)
        }
      }

      return aggr
    }, [])
  }),
  currentOperatorsByPath: derived((state: State) => {
    const operators = Object.keys(state.currentAction.operators)
      .map((id) => Number(id))
      .sort((a, b) => a - b)
      .map((operatorId) => state.currentAction.operators[operatorId])

    return operators.reduce((aggr, operator): OperatorsByPath[] => {
      let currentValue = state.currentAction.value
      const traversePath = operator.path.slice()
      traversePath.unshift('')
      // eslint-disable-next-line
      traversePath.reduce((childrenByPath, key, index) => {
        const isLastKey = index === traversePath.length - 1
        const matchingChildren = childrenByPath.find(
          (children) => children[0].path === key
        )
        const lastChildByPath = matchingChildren
          ? matchingChildren[matchingChildren.length - 1]
          : null

        if (isLastKey) {
          const newChild = {
            path: key,
            operator,
            childrenByPath: [],
            value: matchingChildren
              ? lastChildByPath.operator.result
              : currentValue,
          }

          matchingChildren
            ? matchingChildren.push(newChild)
            : childrenByPath.push([newChild])

          // eslint-disable-next-line
          return
        }

        currentValue = lastChildByPath.value

        return lastChildByPath.childrenByPath
      }, aggr)

      return aggr
    }, [])
  }),
}

export default state
