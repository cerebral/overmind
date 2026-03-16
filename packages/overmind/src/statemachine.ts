import isPlainObject from 'is-plain-obj'
import { IMutationTree, PATH, PROXY_TREE, VALUE } from 'proxy-state-tree'

import { IState } from '.'
import { Devtools } from './Devtools'
import { isStateMachine } from './utils'

type TState = {
  current: string
} & TBaseState

type TBaseState = {
  [key: string]: IState | Statemachine<any, any, any>
}

type TEvents = {
  type: string
  data?: any
}

export type StatemachineTransitions<
  States extends TState,
  Events extends TEvents,
  BaseState extends TBaseState,
> =
  | ([BaseState] extends [never]
      ? (event: Events, state: States) => States | void
      : (event: Events, state: States & BaseState) => States | void)
  | {
      [State in States['current']]: {
        [Type in Events['type']]?: [BaseState] extends [never]
          ? (
              event: Events extends { type: Type } ? Events['data'] : never,
              state: States extends { current: State } ? States : never
            ) => States | void
          : (
              event: Events extends { type: Type } ? Events['data'] : never,
              state: States extends { current: State }
                ? States & BaseState
                : never
            ) => States | void
      }
    }

export interface MachineMethods<
  States extends TState,
  Events extends TEvents,
  BaseState extends TBaseState,
> {
  matches<T extends States['current']>(
    current: T
  ):
    | Statemachine<
        States extends { current: T } ? States : never,
        Events,
        BaseState
      >
    | undefined
  send<T extends Events['type']>(
    ...args: Events extends { type: T; data: any } ? [T, Events['data']] : [T]
  ): Statemachine<States, Events, BaseState>
  onTransition(listener: (state: States) => void): void
}

export type Statemachine<
  States extends TState,
  Events extends TEvents,
  BaseState extends TBaseState = never,
> = [BaseState] extends [never]
  ? States & MachineMethods<States, Events, BaseState>
  : States & BaseState & MachineMethods<States, Events, BaseState>

const INITIAL_STATE = Symbol('INITIAL_STATE')
const TRANSITIONS = Symbol('TRANSITIONS')
const STATE = Symbol('STATE')
const IS_DISPOSED = Symbol('IS_DISPOSED')
const CURRENT_KEYS = Symbol('CURRENT_KEYS')
const BASE_STATE = Symbol('BASE_STATE')
const TRANSITION_LISTENERS = Symbol('TRANSITION_LISTENERS')

// We have to export here to avoid a circular dependency issue with "utils"
export function deepCopy(obj: any): any {
  if (isStateMachine(obj)) {
    return (obj as any).clone()
  } else if (isPlainObject(obj)) {
    return Object.keys(obj).reduce((aggr: any, key) => {
      if (key === '__esModule') {
        return aggr
      }

      const originalDescriptor = Object.getOwnPropertyDescriptor(obj, key)
      const isAGetter = originalDescriptor && 'get' in originalDescriptor
      const value = obj[key]

      if (isAGetter) {
        Object.defineProperty(aggr, key, originalDescriptor as any)
      } else {
        aggr[key] = deepCopy(value)
      }

      return aggr
    }, {})
  } else if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy(item))
  }

  return obj
}

export class StateMachine<
  State extends TState,
  Events extends TEvents,
  BaseState extends TBaseState,
> {
  current!: State['current']
  private [INITIAL_STATE]!: State['current']
  private [TRANSITIONS]!: StatemachineTransitions<State, Events, BaseState>
  private [STATE]: any
  private [BASE_STATE]!: BaseState
  private [TRANSITION_LISTENERS]: Array<(state: State) => void> = []
  private [IS_DISPOSED] = false
  private clone() {
    return new StateMachine(
      this[TRANSITIONS],
      deepCopy(this[STATE]),
      deepCopy(this[BASE_STATE])
    )
  }

  private dispose() {
    (this as any)[VALUE][TRANSITION_LISTENERS] = []
    Object.keys((this as any)[VALUE]).forEach((key) => {
      if ((this as any)[VALUE][key] instanceof StateMachine) {
        (this as any)[key].dispose()
      }
    })
    ;(this as any)[VALUE][IS_DISPOSED] = true
  }

  constructor(
    transitions: StatemachineTransitions<State, Events, BaseState>,
    state: State,
    baseState: BaseState
  ) {
    ;(this as any)[STATE] = state
    ;(this as any)[BASE_STATE] = baseState
    ;(this as any)[INITIAL_STATE] = state.current
    ;(this as any)[TRANSITIONS] = transitions
    ;(this as any)[CURRENT_KEYS] = Object.keys(state)
    Object.assign(this, state, baseState)
  }

  send(type: any, data: any) {
    if ((this as any)[VALUE][IS_DISPOSED]) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `Overmind - The statemachine at "${(this as any)[PATH]}" has been disposed, but you tried to transition on it`
        )
      }
      return this
    }

    const tree: IMutationTree<object, Devtools | undefined> =
      (this as any)[PROXY_TREE].root.mutationTree || (this as any)[PROXY_TREE]

    tree.enableMutations()

    let result

    if (typeof (this as any)[VALUE][TRANSITIONS] === 'function') {
      const transition = (this as any)[VALUE][TRANSITIONS]

      result = transition({ type, data }, this)
    } else if ((this as any)[VALUE][TRANSITIONS][(this as any)[VALUE].current][type]) {
      const transition = (this as any)[VALUE][TRANSITIONS][(this as any)[VALUE].current][type]

      result = transition(data, this)
    }

    if (result) {
      ;(this as any)[VALUE].previousState = (this as any)[VALUE].current

      ;(this as any)[VALUE][CURRENT_KEYS].forEach((key: any) => {
        if (key !== 'current') {
          delete (this as any)[key]
        }
      })
      ;(this as any)[VALUE][CURRENT_KEYS] = Object.keys(result)
      Object.assign(this, result)

      // Report to DevTools if available
      const devtools = tree.root.options.getDevtools?.()
      if (devtools && typeof devtools.send === 'function') {
        devtools.send({
          type: 'machine:transition',
          data: {
            path: (this as any)[PATH],
            fromState: (this as any)[VALUE].previousState,
            toState: (this as any)[VALUE].current,
            eventType: type,
            payload: data,
            timestamp: Date.now(),
          },
        })
      }

      ;(this as any)[VALUE][TRANSITION_LISTENERS].forEach((listener: any) => listener(this))
    }

    tree.blockMutations()

    return this
  }

  matches(state: any) {
    if (this.current === state) {
      return this
    }
  }

  onTransition(listener: (state: State) => void) {
    ;(this as any)[VALUE][TRANSITION_LISTENERS].push(listener)
  }
}

export type StatemachineFactory<
  States extends TState,
  Events extends TEvents,
  BaseState extends TBaseState,
> = [BaseState] extends [never]
  ? {
      create(state: States): Statemachine<States, Events, {}>
    }
  : {
      create(
        state: States,
        baseState: BaseState
      ): Statemachine<States, Events, BaseState>
    }

export function statemachine<
  States extends TState,
  Events extends TEvents,
  BaseState extends TBaseState = never,
>(
  transitions: StatemachineTransitions<States, Events, BaseState>
): StatemachineFactory<States, Events, BaseState> {
  return {
    create(state: any, baseState: any) {
      return new StateMachine(transitions, state as any, baseState as any)
    },
  } as any
}
