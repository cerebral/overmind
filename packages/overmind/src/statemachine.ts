import isPlainObject from 'is-plain-obj'
import { PATH, PROXY_TREE, VALUE } from 'proxy-state-tree'

import { IState } from '.'

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
  BaseState extends TBaseState
> =
  | ([BaseState] extends [never]
      ? (event: Events, state: States) => States | void
      : (event: Events, state: States & BaseState) => States | void)
  | {
      [State in States['current']]: {
        [Type in Events['type']]?: [BaseState] extends [never]
          ? ((
              event: Events extends { type: Type } ? Events['data'] : never,
              state: States extends { current: State } ? States : never
            ) => States | void)
          : ((
              event: Events extends { type: Type } ? Events['data'] : never,
              state: States extends { current: State }
                ? States & BaseState
                : never
            ) => States | void)
      }
    }

export interface MachineMethods<
  States extends TState,
  Events extends TEvents,
  BaseState extends TBaseState
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
  BaseState extends TBaseState = never
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
export function deepCopy(obj) {
  if (obj instanceof StateMachine) {
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
  BaseState extends TBaseState
> {
  current: State['current']
  private [INITIAL_STATE]: State['current']
  private [TRANSITIONS]: StatemachineTransitions<State, Events, BaseState>
  private [STATE]: any
  private [BASE_STATE]: BaseState
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
    this[VALUE][TRANSITION_LISTENERS] = []
    Object.keys(this[VALUE]).forEach((key) => {
      if (this[VALUE][key] instanceof StateMachine) {
        this[key].dispose()
      }
    })
    this[VALUE][IS_DISPOSED] = true
  }

  constructor(
    transitions: StatemachineTransitions<State, Events, BaseState>,
    state: State,
    baseState: BaseState
  ) {
    this[STATE] = state
    this[BASE_STATE] = baseState
    this[INITIAL_STATE] = state.current
    this[BASE_STATE] = baseState
    this[TRANSITIONS] = transitions
    this[CURRENT_KEYS] = Object.keys(state)
    Object.assign(this, state, baseState)
  }

  send(type, data) {
    if (this[VALUE][IS_DISPOSED]) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `Overmind - The statemachine at "${
            this[PATH]
          }" has been disposed, but you tried to transition on it`
        )
      }
      return this
    }

    const tree = this[PROXY_TREE].master.mutationTree || this[PROXY_TREE]

    tree.enableMutations()

    let result

    if (typeof this[VALUE][TRANSITIONS] === 'function') {
      const transition = this[VALUE][TRANSITIONS]

      result = transition({ type, data }, this)
    } else if (this[VALUE][TRANSITIONS][this[VALUE].current][type]) {
      const transition = this[VALUE][TRANSITIONS][this[VALUE].current][type]

      result = transition(data, this)
    }

    if (result) {
      this[VALUE][CURRENT_KEYS].forEach((key) => {
        if (key !== 'current') {
          delete this[key]
        }
      })
      this[VALUE][CURRENT_KEYS] = Object.keys(result)
      Object.assign(this, result)
      this[VALUE][TRANSITION_LISTENERS].forEach((listener) => listener(this))
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
    this[VALUE][TRANSITION_LISTENERS].push(listener)
  }
}

export type StatemachineFactory<
  States extends TState,
  Events extends TEvents,
  BaseState extends TBaseState
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
  BaseState extends TBaseState = never
>(
  transitions: StatemachineTransitions<States, Events, BaseState>
): StatemachineFactory<States, Events, BaseState> {
  return {
    create(state, baseState) {
      return new StateMachine(transitions, state as any, baseState as any)
    },
  } as any
}
