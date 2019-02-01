import { IMutation, IMutationTree } from 'proxy-state-tree'
import { Configuration, IAction, IOperator, TStateObject } from './types'

export type SubType<Base, Condition> = Pick<
  Base,
  { [Key in keyof Base]: Base[Key] extends Condition ? Key : never }[keyof Base]
>

export type NestedPartial<T> = T extends Function
  ? T
  : Partial<{ [P in keyof T]: NestedPartial<T[P]> }>

export type Options = {
  name?: string
  devtools?: string | boolean
  logProxies?: boolean
  testMode?: {
    effectsCallback: (
      effect: {
        effectId: number
        name: string
        method: string
        args: any[]
      }
    ) => {}
    actionCallback: (execution: any) => void
  }
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
  path: string[]
  emit(event: EventType, value: any): void
  flush(): {
    mutations: IMutation[]
    flushId: number
  }
  getMutationTree(): IMutationTree<any>
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
    name: string
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

export type TBaseContext<Config extends Configuration> = {
  state: ResolveState<Config['state']>
  actions: ResolveActions<Config['actions']>
  effects: Config['effects']
  execution: any
}

type Derived = (parent: any, config: any) => any

export type ResolveState<State extends TStateObject> = State extends undefined
  ? {}
  : {
      [P in keyof State]: State[P] extends Derived
        ? ReturnType<State[P]>
        : State[P] extends Array<any>
        ? State[P]
        : State[P] extends TStateObject
        ? ResolveState<State[P]>
        : State[P]
    }

type TActionValue<T> = T extends (a1: infer TContext) => any
  ? (TContext extends { value: infer TValue } ? TValue : never)
  : never

type TOperationValue<T> = T extends (
  arg1: any,
  arg2: infer TContext,
  arg3: any
) => any
  ? (TContext extends { value: infer TValue } ? TValue : never)
  : never

type NestedActions =
  | {
      [key: string]:
        | IAction<any, any>
        | IOperator<any, any, any>
        | NestedActions
    }
  | undefined

export type ResolveActions<
  Actions extends NestedActions
> = Actions extends undefined
  ? {}
  : {
      [T in keyof Actions]: Actions[T] extends IAction<any, any>
        ? TActionValue<Actions[T]> extends void
          ? () => Promise<void>
          : (value: TActionValue<Actions[T]>) => Promise<void>
        : Actions[T] extends IOperator<any, any, any>
        ? TOperationValue<Actions[T]> extends void
          ? () => Promise<void>
          : (value: TOperationValue<Actions[T]>) => Promise<void>
        : Actions[T] extends NestedActions
        ? ResolveActions<Actions[T]>
        : never
    }

type NestedMockActions =
  | {
      [key: string]:
        | IAction<any, any>
        | IOperator<any, any, any>
        | NestedMockActions
    }
  | undefined

type MockResult = IMutation[]

export type ResolveMockActions<
  Actions extends NestedMockActions
> = Actions extends undefined
  ? {}
  : {
      [T in keyof Actions]: Actions[T] extends IAction<any, any>
        ? TActionValue<Actions[T]> extends void
          ? () => Promise<MockResult>
          : (value: TActionValue<Actions[T]>) => Promise<MockResult>
        : Actions[T] extends IOperator<any, any, any>
        ? TOperationValue<Actions[T]> extends void
          ? () => Promise<MockResult>
          : (value: TOperationValue<Actions[T]>) => Promise<MockResult>
        : Actions[T] extends NestedMockActions
        ? ResolveMockActions<Actions[T]>
        : never
    }
