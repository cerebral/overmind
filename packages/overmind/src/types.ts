import { ResolveAction, ContextFunction } from './internalTypes'
import { IS_OPERATOR } from './utils'
import { IMutationCallback, IFlushCallback } from 'proxy-state-tree'

/** ===== PUBLIC API
 */
export { EventType } from './internalTypes'

export type IConfiguration = {
  state?: {}
  effects?: {}
  actions?: {}
}

export type IState = {
  [key: string]: IState | string | number | boolean | object | null | undefined
}

export type IContext<T extends IConfiguration> = {
  state: T['state']
  actions: { [K in keyof T['actions']]: ResolveAction<T['actions'][K]> }
  effects: T['effects']
  reaction: IReaction<{ state: T['state'] }>
  addMutationListener: (cb: IMutationCallback) => () => void
  addFlushListener: (cb: IFlushCallback) => () => void
}

export interface IAction<I, O> extends ContextFunction<I, O> {}

export interface IOperator<I, O> extends ContextFunction<I, O> {
  [IS_OPERATOR]: true
}

export interface IReaction<T extends { state?: IState }> {
  <O>(
    stateCallback: (state: T['state']) => O,
    updateCallback: (value: O) => void,
    options?: {
      nested?: boolean
      immediate?: boolean
    }
  ): () => void
}
