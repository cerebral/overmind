import { Context } from 'vm'

import {
  ActionGroupItem,
  ActionItem,
  ActionsListItemType,
  AddComponentMessage,
  AppMessage,
  ChartMessage,
  DerivedMessage,
  DirtyDerivedMessage,
  Effect,
  EffectMessage,
  EndActionMessage,
  EndOperatorMessage,
  EventType,
  ExecutionType,
  FlushMessage,
  GetterMessage,
  InitMessage,
  Message,
  MutationsMessage,
  RemoveComponentMessage,
  StartActionMessage,
  StartOperatorMessage,
  StateMessage,
  UpdateComponentMessage,
} from './types'
import {
  createApp,
  ensureFlushExists,
  getActionId,
  getOperatorId,
  runMutation,
} from './utils'

export const ensureCurrentApp = ({ state }: Context, message: Message) => {
  if (!state.currentAppName) {
    state.currentAppName = message.appName
  }

  return message
}

export const runGetterMutation = ({ state }, message: GetterMessage) => {
  runMutation(state.apps[message.appName].state)({
    method: 'set',
    path: message.data.path,
    args: [message.data.value],
    delimiter: state.apps[message.appName].delimiter || '.',
  })
}

export const addStateAndActions = ({ state }, message: InitMessage) => {
  state.isConnecting = false
  state.error = null
  state.apps[message.appName].connectionState = 'connected'
  state.apps[message.appName].state = message.data.state
  state.apps[message.appName].actionPaths = message.data.actions
  state.apps[message.appName].delimiter = message.data.delimiter || '.'
}

export const addFlush = ({ state }: Context, message: FlushMessage) => {
  ensureFlushExists(state.apps[message.appName].flushes, message.data)
  state.apps[message.appName].flushes[message.data.flushId].mutations =
    message.data.mutations

  if (typeof message.data.operatorId === 'undefined') {
    state.apps[message.appName].flushByActionId[getActionId(message.data)] = {
      flushId: message.data.flushId,
    }
  } else {
    state.apps[message.appName].flushByOperatorId[
      getOperatorId(message.data)
    ] = {
      flushId: message.data.flushId,
    }
  }
}

export const ensureApp = ({ state, actions }: Context, message: Message) => {
  if (
    !state.apps[message.appName] ||
    message.message.type === ExecutionType.INIT
  ) {
    state.apps[message.appName] = createApp({
      name: message.appName,
    })

    // Do not use await, as it will block further execution, this stuff has to be sync
    actions.setAppDataFromStorage({
      appName: message.appName,
      actions: message.message.data.actions,
    })
  }

  return message
}

export const addClientMessage = ({ state }: Context, message: Message) => {
  state.apps[message.appName].messages.unshift(message.message)

  return message
}

export const addComponent = (
  { state }: Context,
  message: AddComponentMessage
) => {
  const id = `${message.data.componentId}_${message.data.componentInstanceId}`

  state.apps[message.appName].components[id] = {
    id,
    isMounted: true,
    updateCount: 0,
    name: message.data.name,
    paths: message.data.paths,
    isCollapsed: true,
  }
}

export const updateComponent = (
  { state }: Context,
  message: UpdateComponentMessage
) => {
  const id = `${message.data.componentId}_${message.data.componentInstanceId}`

  state.apps[message.appName].components[id].paths = message.data.paths

  if ('flushId' in message.data) {
    state.apps[message.appName].components[id].updateCount++

    ensureFlushExists(state.apps[message.appName].flushes, message.data)

    if (
      state.apps[message.appName].flushes[
        message.data.flushId
      ].components.includes(id)
    ) {
      return
    }

    state.apps[message.appName].flushes[message.data.flushId].components.push(
      id
    )
  }
}

export const removeComponent = (
  { state }: Context,
  message: RemoveComponentMessage
) => {
  const id = `${message.data.componentId}_${message.data.componentInstanceId}`

  state.apps[message.appName].components[id].isMounted = false
}

export const updateDerived = ({ state }: Context, message: DerivedMessage) => {
  const appState = state.apps[message.appName].state
  // For backwards compatability it can still be a string
  const actualPath = Array.isArray(message.data.path)
    ? message.data.path
    : (message.data.path as any).split('.')
  const path = actualPath.slice()
  const key = path.pop()
  const target = path.reduce(
    (aggr, pathKey) =>
      aggr && aggr.__CLASS__ ? aggr[pathKey].value : aggr[pathKey],
    appState
  )

  if (target.__CLASS__) {
    target.value[key] = message.data.value
  } else {
    target[key] = message.data.value
  }

  state.apps[message.appName].derived[
    actualPath.join(state.apps[message.appName].delimiter)
  ] = message.data
}

export const updateFlushWithDerived = (
  { state }: Context,
  message: DirtyDerivedMessage
) => {
  ensureFlushExists(state.apps[message.appName].flushes, message.data)
  state.apps[message.appName].flushes[message.data.flushId].derived.push(
    message.data.derivedPath
  )
}

export const addAction = ({ state }: Context, message: StartActionMessage) => {
  const app = state.apps[message.appName]
  const action = message.data
  const actionId = getActionId(action)
  const isSelectingFirstAction =
    !app.currentActionId || app.currentActionId === app.actionsList[0].id

  app.actions[actionId] = {
    ...action,
    isRunning: true,
    operators: {},
    hasError: false,
    time: Date.now(),
  }

  if (action.parentExecution) {
    return
  }

  if (
    !app.actionsList.length ||
    app.actionsList[0].actionId !== action.actionId
  ) {
    app.actionsList.unshift({
      type: ActionsListItemType.ACTION,
      id: actionId,
      actionId: action.actionId,
    })
  } else if (app.actionsList[0].type === ActionsListItemType.ACTION) {
    const existingId = (app.actionsList[0] as ActionItem).id
    app.actionsList[0] = {
      type: ActionsListItemType.GROUP,
      id: actionId,
      actionId: action.actionId,
      isCollapsed: true,
      actionIds: [actionId, existingId],
    }
  } else if (app.actionsList[0].type === ActionsListItemType.GROUP) {
    ;(app.actionsList[0] as ActionGroupItem).actionIds.unshift(actionId)
    ;(app.actionsList[0] as ActionGroupItem).id = actionId
  }

  if (isSelectingFirstAction) {
    app.currentActionId = actionId
  }
}

export const addChart = ({ state }: Context, message: ChartMessage) => {
  const app = state.apps[message.appName]
  const data = message.data
  const chartId = data.path.join('.')
  const isSelectingFirstChart = !app.currentChartId

  app.charts[chartId] = data

  if (isSelectingFirstChart) {
    app.currentChartId = chartId
  }
}

export const addOperator = (
  { state }: Context,
  message: StartOperatorMessage
) => {
  const operatorData = message.data
  const actionId = getActionId(operatorData)
  const action = state.apps[message.appName].actions[actionId]
  const operator = {
    ...operatorData,
    isRunning: true,
    events: [],
  }

  if (operatorData.parentExecution && operatorData.operatorId === 0) {
    const parentActionId = getActionId(operatorData.parentExecution)
    const parentOperator =
      state.apps[message.appName].actions[parentActionId].operators[
        operatorData.parentExecution.operatorId
      ]

    parentOperator.events.push({
      type: EventType.Action,
      data: actionId,
    })
  }

  action.operators[operator.operatorId] = operator
}

export const updateOperator = (
  { state }: Context,
  message: EndOperatorMessage
) => {
  const operatorData = message.data
  const actionId = getActionId(operatorData)
  const action = state.apps[message.appName].actions[actionId]
  const operator = action.operators[operatorData.operatorId]

  operator.isAsync = operatorData.isAsync
  operator.isRunning = false
  operator.result = operatorData.result
  operator.error = operatorData.error
  operator.isIntercepted = operatorData.isIntercepted
  operator.isSkipped = operatorData.isSkipped

  if (operator.error) {
    action.hasError = true
  }
}

export const updateState = ({ state }: Context, message: StateMessage) => {
  const app = state.apps[message.appName]
  const path = message.data.path
  const key = path.pop()
  const target = path.reduce(
    (aggr, key) => (aggr[key].__CLASS__ ? aggr[key].value : aggr[key]),
    app.state
  )

  target[key] = message.data.value
}

export const updateAction = ({ state }: Context, message: EndActionMessage) => {
  const app = state.apps[message.appName]
  const action = message.data
  const id = `${action.actionId}_${action.executionId}`

  app.actions[id].isRunning = false
}

export const addMutations = ({ state }: Context, message: MutationsMessage) => {
  const mutations = message.data

  // For backwards compatability, ensure delimiter
  mutations.mutations.forEach((mutation) => {
    mutation.delimiter = mutation.delimiter || '.'
  })

  const id = `${mutations.actionId}_${mutations.executionId}`
  const operator =
    state.apps[message.appName].actions[id].operators[mutations.operatorId]

  operator.events = operator.events.concat(
    mutations.mutations.map((mutation) => ({
      type: EventType.Mutation,
      data: mutation,
    }))
  )

  message.data.mutations.forEach(runMutation(state.apps[message.appName].state))
}

export const updateEffect = ({ state }: Context, message: EffectMessage) => {
  const effect = message.data
  const id = getActionId(effect)
  const action = state.apps[message.appName].actions[id]
  const operator =
    state.apps[message.appName].actions[id].operators[effect.operatorId]
  const existingEvent = operator.events.find(
    (event) =>
      event.type === EventType.Effect &&
      (event.data as Effect).effectId === effect.effectId
  )

  if (existingEvent) {
    Object.assign(existingEvent.data, effect)
  } else {
    operator.events.push({
      type: EventType.Effect,
      data: effect,
    })
  }

  if (effect.error) {
    action.hasError = true
  }
}

export const getMessage = (_, value: Message) =>
  ({
    ...value.message,
    appName: value.appName,
  } as AppMessage<any>)

export const updateOperatorAsync = () => () => {}
