import isPlainObject from 'is-plain-obj'

import { IConfiguration } from '../'

function copy(target, source) {
  return Object.keys(source).reduce((aggr, key) => {
    if (key === '__esModule') {
      return aggr
    }

    if (isPlainObject(source[key])) {
      aggr[key] = copy(target[key] || {}, source[key])
    } else if (Array.isArray(source[key])) {
      aggr[key] = source[key]
    } else {
      const originalDescriptor = Object.getOwnPropertyDescriptor(source, key)
      const isAGetter = originalDescriptor && 'get' in originalDescriptor
      const value = source[key]

      if (isAGetter) {
        Object.defineProperty(aggr, key, originalDescriptor as any)
      } else {
        aggr[key] = value
      }
    }

    return aggr
  }, target)
}

export function merge<A extends IConfiguration, B extends IConfiguration>(
  configA: A,
  configB: B
): A & B
export function merge<
  A extends IConfiguration,
  B extends IConfiguration,
  C extends IConfiguration
>(configA: A, configB: B, configC: C): A & B & C
export function merge<
  A extends IConfiguration,
  B extends IConfiguration,
  C extends IConfiguration,
  D extends IConfiguration
>(configA: A, configB: B, configC: C, configD: D): A & B & C & D
export function merge<
  A extends IConfiguration,
  B extends IConfiguration,
  C extends IConfiguration,
  D extends IConfiguration,
  E extends IConfiguration
>(configA: A, configB: B, configC: C, configD: D, configE: E): A & B & C & D & E
export function merge<
  A extends IConfiguration,
  B extends IConfiguration,
  C extends IConfiguration,
  D extends IConfiguration,
  E extends IConfiguration,
  F extends IConfiguration
>(
  configA: A,
  configB: B,
  configC: C,
  configD: D,
  configE: E,
  configF: F
): A & B & C & D & E & F
export function merge<
  A extends IConfiguration,
  B extends IConfiguration,
  C extends IConfiguration,
  D extends IConfiguration,
  E extends IConfiguration,
  F extends IConfiguration,
  G extends IConfiguration
>(
  configA: A,
  configB: B,
  configC: C,
  configD: D,
  configE: E,
  configF: F,
  configG: G
): A & B & C & D & E & F & G
export function merge<
  A extends IConfiguration,
  B extends IConfiguration,
  C extends IConfiguration,
  D extends IConfiguration,
  E extends IConfiguration,
  F extends IConfiguration,
  G extends IConfiguration,
  H extends IConfiguration
>(
  configA: A,
  configB: B,
  configC: C,
  configD: D,
  configE: E,
  configF: F,
  configG: G,
  configH: H
): A & B & C & D & E & F & G & H
export function merge<
  A extends IConfiguration,
  B extends IConfiguration,
  C extends IConfiguration,
  D extends IConfiguration,
  E extends IConfiguration,
  F extends IConfiguration,
  G extends IConfiguration,
  H extends IConfiguration,
  I extends IConfiguration
>(
  configA: A,
  configB: B,
  configC: C,
  configD: D,
  configE: E,
  configF: F,
  configG: G,
  configH: H,
  configI: I
): A & B & C & D & E & F & G & H & I

export function merge(...configurations: IConfiguration[]): IConfiguration {
  const rootConfiguration = configurations.shift()
  const reducedConfigurations = configurations.reduce(
    (aggr, config) => {
      const stateDuplicates = aggr.state
        ? Object.keys(aggr.state).some((key) =>
            config.state ? Object.keys(config.state).includes(key) : false
          )
        : false
      const actionsDuplicates = aggr.actions
        ? Object.keys(aggr.actions).some((key) =>
            config.actions ? Object.keys(config.actions).includes(key) : false
          )
        : false
      const effectsDuplicates = aggr.effects
        ? Object.keys(aggr.effects).some((key) =>
            config.effects ? Object.keys(config.effects).includes(key) : false
          )
        : false
      if (stateDuplicates) {
        throw new Error(
          'Merge conflict: at least one state definition contains a duplicate key'
        )
      }
      if (actionsDuplicates) {
        throw new Error(
          'Merge conflict: at least one actions definition contains a duplicate key'
        )
      }
      if (effectsDuplicates) {
        throw new Error(
          'Merge conflict: at least one effects definition contains a duplicate key'
        )
      }
      return {
        state: copy(aggr.state, config.state || {}),
        effects: {
          ...aggr.effects,
          ...config.effects,
        },
        actions: {
          ...aggr.actions,
          ...config.actions,
        },
      }
    },
    {
      state: {},
      actions: {},
      effects: {},
      ...rootConfiguration,
    }
  )
  return reducedConfigurations
}
