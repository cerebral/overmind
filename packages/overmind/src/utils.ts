import isPlainObject from 'is-plain-obj'
import { IMutation, IS_PROXY, VALUE } from 'proxy-state-tree'
import { deepCopy } from './statemachine'

// Due to avoid circular dependency warnings we export this utility from here
export { deepCopy } from './statemachine'

export const createOnInitialize = () => {
  return ({ actions }, instance) => {
    const initializers = getActionsByName('onInitializeOvermind', actions)

    return Promise.all(initializers.map((initialize) => initialize(instance)))
  }
}

export const ENVIRONMENT = (() => {
  let env: string
  try {
    env = process.env.NODE_ENV!
  } catch {
    console.warn(
      'Overmind was unable to determine the NODE_ENV, which means it will run in DEVELOPMENT mode. If this is a production app, please configure your build tool to define NODE_ENV'
    )
    env = 'development'
  }

  return env
})()

export const IS_TEST = ENVIRONMENT === 'test'
export const IS_OPERATOR = Symbol('operator')
export const ORIGINAL_ACTIONS = Symbol('origina_actions')
export const EXECUTION = Symbol('execution')

export const MODE_DEFAULT = Symbol('MODE_DEFAULT')
export const MODE_TEST = Symbol('MODE_TEST')
export const MODE_SSR = Symbol('MODE_SSR')

export class MockedEventEmitter {
  emit() {}
  emitAsync() {}
  on() {}
  once() {}
  addListener() {}
}

export const json = <T>(obj: T): T => {
  return deepCopy(obj && obj[IS_PROXY] ? obj[VALUE] : obj)
}

export function isPromise(maybePromise: any) {
  return (
    maybePromise instanceof Promise ||
    (maybePromise &&
      typeof maybePromise.then === 'function' &&
      typeof maybePromise.catch === 'function')
  )
}

export function processState(state: {}) {
  return Object.keys(state).reduce(
    (aggr, key) => {
      if (key === '__esModule') {
        return aggr
      }
      const originalDescriptor = Object.getOwnPropertyDescriptor(state, key)

      if (originalDescriptor && 'get' in originalDescriptor) {
        Object.defineProperty(aggr, key, originalDescriptor as any)

        return aggr
      }

      const value = state[key]

      if (isPlainObject(value)) {
        aggr[key] = processState(value)
      } else {
        Object.defineProperty(aggr, key, originalDescriptor as any)
      }

      return aggr
    },
    isPlainObject(state) ? {} : state
  )
}

export function getFunctionName(func: Function) {
  return func.name || (func as any).displayName || ''
}

const getChangeMutationsDelimiter = '.'
export function getChangeMutations(
  stateA: object,
  stateB: object,
  path: string[] = [],
  mutations: IMutation[] = []
): IMutation[] {
  const stateAKeys = Object.keys(stateA)
  const stateBKeys = Object.keys(stateB)

  stateAKeys.forEach((key) => {
    if (!stateBKeys.includes(key)) {
      mutations.push({
        delimiter: getChangeMutationsDelimiter,
        args: [],
        path: path.concat(key).join('.'),
        hasChangedValue: false,
        method: 'unset',
      })
    }
  })

  stateBKeys.forEach((key) => {
    if (isPlainObject(stateA[key]) && isPlainObject(stateB[key])) {
      getChangeMutations(stateA[key], stateB[key], path.concat(key), mutations)
    } else if (stateA[key] !== stateB[key]) {
      mutations.push({
        delimiter: getChangeMutationsDelimiter,
        args: [stateB[key]],
        path: path.concat(key).join('.'),
        hasChangedValue: false,
        method: 'set',
      })
    }
  })

  return mutations
}

export function getActionsByName(
  name: string,
  actions = {},
  currentPath: string[] = []
) {
  return Object.keys(actions).reduce<string[]>((aggr, key) => {
    if (typeof actions[key] === 'function' && key === name) {
      return aggr.concat(actions[key])
    }

    return aggr.concat(
      getActionsByName(name, actions[key], currentPath.concat(key))
    )
  }, [])
}

export function getActionPaths(actions = {}, currentPath: string[] = []) {
  return Object.keys(actions).reduce<string[]>((aggr, key) => {
    if (typeof actions[key] === 'function') {
      return aggr.concat(currentPath.concat(key).join('.'))
    }

    return aggr.concat(getActionPaths(actions[key], currentPath.concat(key)))
  }, [])
}

export function createActionsProxy(actions, cb) {
  return new Proxy(actions, {
    get(target, prop) {
      if (prop === ORIGINAL_ACTIONS) {
        return actions
      }

      if (typeof target[prop] === 'function') {
        return cb(target[prop])
      }

      if (!target[prop]) {
        return undefined
      }

      return createActionsProxy(target[prop], cb)
    },
  })
}

export function detectStateCharts(state: any): boolean {
  return traverseStateTree(state, hasStateChartStructure)
}

function traverseStateTree(
  state: any,
  checkFn: (state: any) => boolean,
  visited = new Set()
): boolean {
  if (!state || typeof state !== 'object') {
    return false
  }

  if (visited.has(state)) {
    return false
  }
  visited.add(state)

  if (checkFn(state)) {
    return true
  }

  // Skip proxy leaf nodes but still traverse proxy namespace objects
  if (
    state[IS_PROXY] &&
    !Object.keys(state).some((key) => typeof state[key] === 'object')
  ) {
    return false
  }

  if (Array.isArray(state)) {
    for (let i = 0; i < state.length; i++) {
      const item = state[i]
      if (
        item &&
        typeof item === 'object' &&
        traverseStateTree(item, checkFn, visited)
      ) {
        return true
      }
    }
    return false
  }

  for (const key in state) {
    if (
      state.hasOwnProperty(key) &&
      key !== '__proto__' &&
      key !== 'constructor'
    ) {
      const value = state[key]
      if (
        value &&
        typeof value === 'object' &&
        traverseStateTree(value, checkFn, visited)
      ) {
        return true
      }
    }
  }

  return false
}

function hasStateChartStructure(state: any): boolean {
  return !!(
    state &&
    typeof state === 'object' &&
    state.states &&
    Array.isArray(state.states) &&
    state.states.length > 0 &&
    Array.isArray(state.states[0]) &&
    typeof state.matches === 'function' &&
    state.actions &&
    typeof state.actions === 'object'
  )
}
