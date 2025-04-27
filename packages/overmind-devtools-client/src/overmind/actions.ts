import { pipe, wait, fork, Overmind } from 'overmind'
import { Context } from './'

import * as o from './operators'
import {
  ActionsListItemType,
  Component,
  ExecutionType,
  AppMessageType,
  Tab,
} from './types'
import { createApp, isValidJson } from './utils'

export const onInitializeOvermind = async (
  { state, effects }: Context,
  app: Overmind<Context>
) => {
  const config = effects.config.getConfiguration()
  state.port = config.port

  effects.connector.onMessage(app.actions.onMessage)
  effects.connector.onDisconnect(app.actions.onDisconnect)

  await effects.connector.connect(state.port)

  state.actionsSplitSize =
    (await effects.storage.get('devtool.actionsSplitSize')) || 200
}

export const onMessage = pipe(
  o.ensureCurrentApp,
  o.ensureApp,
  o.addClientMessage,
  o.getMessage,
  fork('type', {
    [ExecutionType.INIT]: o.addStateAndActions,
    [ExecutionType.RE_INIT]: o.addStateAndActions,
    [ExecutionType.FLUSH]: o.addFlush,
    [ExecutionType.DERIVED]: o.updateDerived,
    [ExecutionType.MUTATIONS]: o.addMutations,
    [ExecutionType.EFFECT]: o.updateEffect,
    [ExecutionType.STATE]: o.updateState,
    [ExecutionType.COMPONENT_ADD]: o.addComponent,
    [ExecutionType.COMPONENT_UPDATE]: o.updateComponent,
    [ExecutionType.COMPONENT_REMOVE]: o.removeComponent,
    [ExecutionType.DERIVED_DIRTY]: o.updateFlushWithDerived,
    [ExecutionType.ACTION_START]: o.addAction,
    [ExecutionType.OPERATOR_START]: o.addOperator,
    [ExecutionType.OPERATOR_END]: o.updateOperator,
    [ExecutionType.ACTION_END]: o.updateAction,
    [ExecutionType.OPERATOR_ASYNC]: o.updateOperatorAsync,
    [ExecutionType.GETTER]: o.runGetterMutation,
    [ExecutionType.CHART]: o.addChart,
    [ExecutionType.MACHINE_TRANSITION]: o.addStateMachineTransition,
    [AppMessageType.PORT_EXISTS]: () => {},
  })
)

export const setError = ({ state }: Context, error: string) => {
  state.error = error
}

export const onDisconnect = ({ state }: Context, appName: string) => {
  if (appName in state.apps) {
    state.apps[appName] = createApp({
      name: appName,
    })
    state.apps[appName].connectionState = 'pending'
  }
}

export const setPortChangingState = (
  { state }: Context,
  isChanging: boolean
) => {
  state.isChangingPort = isChanging
}

export const changeNewPortValue = ({ state }: Context, port: string) => {
  state.newPortValue = port.replace(/\D/g, '')
}

export const changeTab = ({ state, effects }: Context, tab: Tab) => {
  state.currentTab = tab
  effects.storage.set(`${state.currentApp.name}.currentTab`, tab)
}

export const toggleExpandState = ({ state }: Context, path: string[]) => {
  const pathString = path.join(state.currentApp.delimiter)

  if (state.currentApp.expandedStatePaths.indexOf(pathString) >= 0) {
    state.currentApp.expandedStatePaths.splice(
      state.currentApp.expandedStatePaths.indexOf(pathString),
      1
    )
  } else {
    state.currentApp.expandedStatePaths =
      state.currentApp.expandedStatePaths.concat(pathString)
  }
}

export const selectAction = ({ state }: Context, actionId: string) => {
  for (const index in state.currentApp.actionsList) {
    const item = state.currentApp.actionsList[index]
    if (
      item.type === ActionsListItemType.GROUP &&
      item.id === actionId &&
      state.currentApp.currentActionId === actionId
    ) {
      item.isCollapsed = !item.isCollapsed
      break
    }
  }
  state.currentApp.currentActionId = actionId
}

export const toggleGroupedComponent = ({ state }: Context, name: string) => {
  const index = state.currentApp.expandedComponents.indexOf(name)

  if (index === -1) {
    state.currentApp.expandedComponents.push(name)
  } else {
    state.currentApp.expandedComponents.splice(index, 1)
  }
}

export const selectApp = ({ state }: Context, appName: string) => {
  state.currentAppName = appName
  state.showApps = false
}

export const toggleShowApps = ({ state }: Context) => {
  state.showApps = !state.showApps
}

export const toggleCollapsedComponent = (_: Context, component: Component) => {
  component.isCollapsed = !component.isCollapsed
}

export const toggleQueryingAction = ({ state }: Context) => {
  state.currentApp.isQueryingAction = !state.currentApp.isQueryingAction
}

export const changeActionQuery = ({ state }: Context, query: string) => {
  state.currentApp.actionQuery = query

  const hit = state.currentApp.actionPaths.find((path) =>
    path.startsWith(query)
  )

  if (query.length && hit) {
    state.currentApp.actionQuerySuggestion = hit
  } else {
    state.currentApp.actionQuerySuggestion = ''
  }
}

export const selectQueryAction = (
  { state, effects, actions }: Context,
  path: string
) => {
  const existingActionQuery = state.currentApp.selectedActionQuery

  state.currentApp.selectedActionQuery = path
  state.currentApp.isQueryingAction = false
  state.currentApp.actionQueryPayload = ''
  effects.storage.set(`${state.currentApp.name}.selectedActionQuery`, path)

  if (existingActionQuery === path) {
    actions.executeAction()
  }
}

export const submitQueryAction = ({ state, effects }: Context) => {
  if (!state.currentApp.actionQuerySuggestion) {
    return
  }

  state.currentApp.selectedActionQuery = state.currentApp.actionQuerySuggestion
  state.currentApp.isQueryingAction = false
  state.currentApp.actionQueryPayload = ''

  effects.storage.set(
    `${state.currentApp.name}.selectedActionQuery`,
    state.currentApp.selectedActionQuery
  )
}

export const executeAction = pipe(
  ({ state, effects }: Context) => {
    state.isExecutingAction = true

    const payload = state.currentApp.actionQueryPayload

    if (payload && !isValidJson(payload)) {
      return
    }

    effects.connector.sendMessage(state.currentApp.name, 'executeAction', {
      name: state.currentApp.selectedActionQuery,
      payload: JSON.stringify(
        // eslint-disable-next-line
        eval(
          `(function () { return ${state.currentApp.actionQueryPayload} })()`
        )
      ),
    })
  },
  wait(500),
  ({ state, effects }: Context) => {
    state.currentApp.actionQueryPayload = ''
    effects.storage.set(`${state.currentApp.name}.actionQueryPayload`, '')
    state.isExecutingAction = false
  }
)

export const setActionQueryPayload = (
  { state, effects }: Context,
  payload: string
) => {
  state.currentApp.actionQueryPayload = payload
  effects.storage.set(`${state.currentApp.name}.actionQueryPayload`, payload)
}

export const setState = ({ state }: Context, path: string[]) => {
  state.currentApp.selectedStatePath = path.join(state.currentApp.delimiter)
}

export const undoSettingState = ({ state }: Context) => {
  state.currentApp.selectedStatePath = null
}

export const submitState = ({ state, effects }: Context, newState: string) => {
  const path = state.currentApp.selectedStatePath.split(
    state.currentApp.delimiter
  )

  effects.connector.sendMessage(state.currentApp.name, 'mutation', {
    path,
    // eslint-disable-next-line
    value: JSON.stringify(eval(`(function () { return ${newState} })()`)),
  })

  state.currentApp.selectedStatePath = null
}

export const toggleRuntimeConfig = ({ state }: Context) => {
  state.isShowingRuntime = !state.isShowingRuntime
}

export const refreshApp = ({ state, effects }: Context) => {
  effects.connector.sendMessage(state.currentAppName, 'refresh')
}

export const setAppDataFromStorage = async (
  { state, effects }: Context,
  {
    appName,
    actions,
  }: {
    appName: string
    actions: string[]
  }
) =>
  Promise.all([
    effects.storage.get<string>(`${appName}.selectedActionQuery`),
    effects.storage.get<string>(`${appName}.actionQueryPayload`),
    effects.storage.get<Tab>(`${appName}.currentTab`),
  ]).then(
    ([selectedActionQuery, actionQueryPayload, tab]: [string, string, Tab]) => {
      const actionQuery =
        selectedActionQuery && actions.includes(selectedActionQuery)
          ? selectedActionQuery
          : ''
      state.apps[appName].selectedActionQuery = actionQuery
      state.apps[appName].actionQueryPayload = actionQuery
        ? actionQueryPayload
        : ''
      state.currentTab = tab || state.currentTab
    }
  )

export const updateActionsSplitSize = pipe(
  async ({ state, effects }: Context, size: number) => {
    state.actionsSplitSize = size

    await effects.storage.set('devtool.actionsSplitSize', size)
  }
)

export const updateChartsSplitSize = pipe(
  async ({ state, effects }: Context, size: number) => {
    state.chartsSplitSize = size

    await effects.storage.set('devtool.chartsSplitSize', size)
  }
)

export const clearActions = ({ state }: Context) => {
  state.currentApp.actions = {}
  state.currentApp.actionsList = []
  state.currentApp.currentActionId = null
}

export const selectChart = ({ state }: Context, id: string) => {
  state.currentApp.currentChartId = id
}

export const updateStateMachineSplitSize = pipe(
  async ({ state, effects }: Context, size: number) => {
    state.stateMachinesSplitSize = size

    await effects.storage.set('devtool.stateMachinesSplitSize', size)
  }
)

export const selectStateMachineInstance = (
  { state }: Context,
  machineInstanceId: number
) => {
  state.currentApp.currentStateMachineInstanceId = machineInstanceId
}

export const clearStateMachines = ({ state }: Context) => {
  state.currentApp.stateMachines = {}
  state.currentApp.stateMachinesList = []
  state.currentApp.stateMachineInstances = []
  state.currentApp.currentStateMachineInstanceId = null
}

export const toggleQueryingMachine = ({ state }: Context) => {
  state.currentApp.isQueryingMachine = !state.currentApp.isQueryingMachine
}

export const changeMachineQuery = ({ state }: Context, query: string) => {
  state.currentApp.machineQuery = query

  const hit = Object.keys(state.currentApp.stateMachines).find((path) =>
    path.startsWith(query)
  )
  if (query.length && hit) {
    state.currentApp.machineQuerySuggestion = hit
  } else {
    state.currentApp.machineQuerySuggestion = ''
  }
}

export const selectStateMachine = (
  { state, effects }: Context,
  path: string
) => {
  state.currentApp.selectedStateMachine = path
  state.currentApp.isQueryingMachine = false
  state.currentApp.machineQueryPayload = ''
  effects.storage.set(`${state.currentApp.name}.selectedStateMachine`, path)
}

export const submitMachineQuery = ({ state, effects }: Context) => {
  if (!state.currentApp.machineQuerySuggestion) {
    return
  }

  state.currentApp.selectedStateMachine =
    state.currentApp.machineQuerySuggestion
  state.currentApp.isQueryingMachine = false
  state.currentApp.machineQueryPayload = ''

  effects.storage.set(
    `${state.currentApp.name}.selectedStateMachine`,
    state.currentApp.selectedStateMachine
  )
}

export const startSplitPaneDrag = (
  { state }: Context,
  {
    startPos,
    sizes,
    split,
    minSizes,
  }: {
    startPos: number
    sizes: number[]
    split: 'vertical' | 'horizontal'
    minSizes?: number[]
  }
) => {
  state.splitPane.isDragging = true
  state.splitPane.startPos = startPos
  state.splitPane.startSizes = [...sizes]
  state.splitPane.currentSizes = [...sizes]
  state.splitPane.minSizes = minSizes
  state.splitPane.splitType = split
}

export const handleSplitPaneMove = (
  { state }: Context,
  {
    currentPos,
    containerSize,
    onChange,
    minSizes = [0, 0],
  }: {
    currentPos: number
    containerSize: number
    onChange?: (sizes: number[]) => void
    minSizes?: number[]
  }
) => {
  if (!state.splitPane.isDragging) return

  state.splitPane.containerSize = containerSize

  const delta = currentPos - state.splitPane.startPos

  // Apply minimum size constraints
  const minSize0 = minSizes[0] || 0
  const minSize1 = minSizes[1] || 0

  // Calculate new sizes with minimum constraints
  const newFirstSize = Math.max(
    minSize0,
    Math.min(containerSize - minSize1, state.splitPane.startSizes[0] + delta)
  )
  const newSizes = [newFirstSize, containerSize - newFirstSize]

  state.splitPane.currentSizes = newSizes

  if (onChange) {
    onChange(newSizes)
  }
}

export const stopSplitPaneDrag = ({ state }: Context) => {
  state.splitPane.isDragging = false
}
