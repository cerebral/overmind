import * as ColorHash from 'color-hash'
import clonedeep from 'lodash.clonedeep'

import { Action, App, Flush, Mutation, OperatorsByPath } from './types'

export const runMutation = (state) => (mutation: Mutation) => {
  const pathArray = mutation.path.split(mutation.delimiter)
  const key = pathArray.pop()

  const target = pathArray.reduce(
    (current, pathKey) =>
      current[pathKey]
        ? current[pathKey].__CLASS__
          ? current[pathKey].value
          : current[pathKey]
        : current,
    state.__CLASS__ ? state.value : state
  )

  switch (mutation.method) {
    case 'set':
      target[key] = clonedeep(mutation.args[0])
      break
    case 'unset':
      delete target[key]
      break
    default:
      target[key][mutation.method](...clonedeep(mutation.args))
  }
}

export const getActionId = (details: {
  actionId: number
  executionId: number
}) => `${details.actionId}_${details.executionId}`

export const getOperatorId = (details: {
  actionId: number
  executionId: number
  operatorId: number
}) => `${getActionId(details)}_${details.operatorId}`

export const createApp = (data: Partial<App>): App =>
  Object.assign(
    {
      name: null,
      messages: [],
      delimiter: '.',
      state: {},
      components: {},
      derived: {},
      flushes: {},
      actions: {},
      charts: {},
      actionsList: [],
      currentActionId: null,
      currentChartId: null,
      flushByActionId: {},
      flushByOperatorId: {},
      actionQuery: '',
      actionQuerySuggestion: '',
      selectedActionQuery: '',
      isQueryingAction: false,
      actionPaths: [],
      actionQueryPayload: '',
      expandedStatePaths: [''],
      expandedComponents: [],
      selectedStatePath: null,
      connectionState: 'connected',
    },
    data
  )

export const nameToColor = (name, lightness = 0.5, saturation = 0.5) => {
  const colorHash = new ColorHash({
    saturation: saturation,
    lightness: lightness,
  })

  return colorHash.hex(name)
}

export const ensureFlushExists = (flushes, flushData) => {
  if (!flushes[flushData.flushId]) {
    const flush: Flush = {
      flushId: flushData.flushId,
      mutations: [],
      components: [],
      derived: [],
      isCollapsed: true,
      actionName: flushData.actionName,
    }
    flushes[flushData.flushId] = flush
  }
}

export const getAppShortName = (name: string) => {
  const firstLetters = name.split(' ').map((word) => word[0].toUpperCase())

  if (firstLetters.length >= 2) {
    return firstLetters.slice(0, 2)
  }

  return name.substr(0, 2)
}

export const isValidJson = (payload: string) => {
  try {
    // eslint-disable-next-line
    JSON.stringify(eval(`(function () { return ${payload} })()`))

    return true
  } catch (e) {
    return false
  }
}

export const getOperatorsByPath = (action: Action) => {
  const operators = Object.keys(action.operators)
    .map((id) => Number(id))
    .sort((a, b) => a - b)
    .map((operatorId) => action.operators[operatorId])

  return operators.reduce((aggr, operator): OperatorsByPath[] => {
    let currentValue = action.value
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
}
