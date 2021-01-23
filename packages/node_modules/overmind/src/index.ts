import { IS_DERIVED_CONSTRUCTOR } from './derived'
import * as internalTypes from './internalTypes'
import { Overmind } from './Overmind'
import { IConfiguration } from './types'
import * as utils from './utils'

export * from './types'
export * from './operators'
export { Overmind } from './Overmind'
export {
  ResolveAction,
  OperatorContextFunction,
  ContextFunction,
} from './internalTypes'
export { createOperator, createMutationOperator } from './operator'
export { MODE_DEFAULT, MODE_TEST, MODE_SSR, ENVIRONMENT, json } from './utils'
export { SERIALIZE, rehydrate } from './rehydrate'
export { Statemachine, statemachine } from './statemachine'
export * from './OvermindMock'
export * from './OvermindSSR'

export const derived = <S extends object, R extends object, O>(
  cb: (state: S, rootState: R) => O
): O => {
  cb[IS_DERIVED_CONSTRUCTOR] = true
  return cb as any
}

export function createOvermind<Config extends IConfiguration>(
  config: Config,
  options?: internalTypes.Options
): Overmind<Config> {
  return new Overmind(config, options, { mode: utils.MODE_DEFAULT })
}
