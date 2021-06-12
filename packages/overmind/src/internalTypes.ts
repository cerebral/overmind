import {
  IFlushCallback,
  IMutation,
  IMutationTree,
  ITrackStateTree,
} from 'proxy-state-tree'

import { IAction, IOperator } from './types'

export type SubType<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition | undefined ? Key : never
  }[keyof Base]
>

export type NestedPartial<T> = T extends Function
  ? T
  : Partial<{ [P in keyof T]: NestedPartial<T[P]> }>

export type Options = {
  delimiter?: string
  name?: string
  devEnv?: string
  devtools?: string | boolean
  logProxies?: boolean
  hotReloading?: boolean
  strict?: boolean
}

export type DefaultMode = {
  mode: Symbol
}

export type TestMode = {
  mode: Symbol
  options: {
    effectsCallback: (
      effect: {
        effectId: number
        name: string
        method: string
        args: any[]
      }
    ) => {}
  }
}

export type SSRMode = {
  mode: Symbol
}

export enum EventType {
  ACTION_START = 'action:start',
  ACTION_END = 'action:end',
  OPERATOR_START = 'operator:start',
  OPERATOR_END = 'operator:end',
  OPERATOR_ASYNC = 'operator:async',
  MUTATIONS = 'mutations',
  EFFECT = 'effect',
  DERIVED = 'derived',
  DERIVED_DIRTY = 'derived:dirty',
  COMPONENT_ADD = 'component:add',
  COMPONENT_UPDATE = 'component:update',
  COMPONENT_REMOVE = 'component:remove',
  GETTER = 'getter',
}

export type Execution = {
  actionId: number
  executionId: number
  actionName: string
  operatorId: number
  isRunning: boolean
  parentExecution?: Execution
  path: string[]
  emit(event: EventType, value: any): void
  flush(
    isAsync?: boolean
  ): {
    mutations: IMutation[]
    flushId: number
  }
  getMutationTree(): IMutationTree<any>
  getTrackStateTree(): ITrackStateTree<any>
  onFlush(cb: IFlushCallback): () => IFlushCallback[]
  value?: any
  error?: string
}

export interface Events {
  [EventType.ACTION_START]: Execution
  [EventType.ACTION_END]: Execution
  [EventType.OPERATOR_START]: Execution & {
    path: string[]
    type: string
    name?: string
  }
  [EventType.OPERATOR_END]: Execution & {
    path: string[]
    isAsync: boolean
    result: any
  }
  [EventType.OPERATOR_ASYNC]: Execution & {
    path: string[]
    type: string
    name?: string
  }
  [EventType.MUTATIONS]: Execution & {
    mutations: IMutation[]
  }
  [EventType.DERIVED]: {
    path: string
    paths: string[]
    updateCount: number
    value: any
  }
  [EventType.DERIVED_DIRTY]: {
    derivedPath: string[]
    path: string
    flushId: number
  }
  [EventType.EFFECT]: Execution & {
    result: any
    name: string
    method: string
    args: any[]
    isPending: boolean
    error: string
    effectId: number
  }
  [EventType.GETTER]: {
    path: string
    value: any
  }
  [EventType.COMPONENT_ADD]: {
    componentId: number | string
    componentInstanceId: number
    name: string
    paths: string[]
  }
  [EventType.COMPONENT_UPDATE]: {
    componentId: number | string
    componentInstanceId: number
    name: string
    paths: string[]
    flushId?: number
  }
  [EventType.COMPONENT_REMOVE]: {
    componentId: number | string
    componentInstanceId: number
    name: string
  }
}

// ============= PRIVATE TYPES FOR APP

type NestedActions = {
  [key: string]: Function | NestedActions
}

export type ResolveAction<T> = T extends IOperator<void, infer R>
  ? () => Promise<R>
  : T extends IOperator<infer P | undefined, infer R>
  ? (payload?: P) => Promise<R>
  : T extends IOperator<infer P, infer R>
  ? (payload: P) => Promise<R>
  : T extends IAction<void, infer R>
  ? () => R
  : T extends IAction<infer P | undefined, infer R>
  ? (payload?: P) => R
  : T extends IAction<infer P, infer R>
  ? (payload: P) => R
  : T extends NestedActions
  ? { [K in keyof T]: ResolveAction<T[K]> }
  : never

export interface ContextFunction<P extends any, R extends any> {
  (
    context: {
      state: any
      actions: any
      effects: any
      reaction: any
      addMutationListener: any
      addFlushListener: any
    },
    payload: P
  ): R
}

// This resolves promises to its values, cause that is how operators work
export interface OperatorContextFunction<P extends any, R extends any> {
  (
    context: {
      state: any
      actions: any
      effects: any
      reaction: any
      addMutationListener: any
      addFlushListener: any
    },
    payload: P extends Promise<infer PP> ? PP : P
  ): R
}
