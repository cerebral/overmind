import App, {
  TAction,
  TApp,
  TContext,
  TDerive,
  TMutate,
  TReaction,
} from 'overmind'
import createConnect, { TConnect } from 'overmind-react'

import * as actions from './actions'
import * as effects from './effects'
import * as state from './state'

const config = {
  effects,
  actions,
  state,
}

const app = new App(config)

export type Connect = TConnect<typeof app>

export const connect = createConnect(app)

type IApp = TApp<typeof config>

export default app

// ==== The following types are copied from overmind documentation ====

export type Action<Value = void, ReturnValue = Value> = TAction<
  IApp,
  Value,
  ReturnValue
>

export type Mutate<Value = any> = TMutate<IApp, Value>

export type Context<Value> = TContext<IApp, Value>

// Operations
export type Map<Value, ReturnValue = Value> = (
  ctx: Context<Value>
) => ReturnValue
export type Filter<Value = any> = (ctx: Context<Value>) => boolean
export type When<Value = any> = (ctx: Context<Value>) => boolean
export type Run<Value = any> = (ctx: Context<Value>) => void
export type Fork<Value = any> = (ctx: Context<Value>) => string
export type Attempt<Value, ReturnValue> = (ctx: Context<Value>) => ReturnValue

export type Derive<Value> = TDerive<IApp, Value>

export type Reaction = TReaction<IApp>
