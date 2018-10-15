import App, {
  TAction,
  TConfig,
  TContext,
  TDerive,
  TMutate,
  TReaction,
} from 'overmind'
import createConnect, { TConnect } from 'overmind-react'

import * as actions from './actions'
import * as context from './context'
import * as state from './state'

export const config = {
  context,
  actions,
  state,
}

const app = new App(config)

export type Connect = TConnect<typeof app>

export const connect = createConnect(app)

/*
  OVERMIND TYPES
*/

type Config = TConfig<typeof config>

export type Action<Value = void, ReturnValue = Value> = TAction<
  Config,
  Value,
  ReturnValue
>

export type Mutate<Value = any> = TMutate<Config, Value>

export type Context<Value> = TContext<Config, Value>

export type Map<Value, ReturnValue = Value> = (
  ctx: Context<Value>
) => ReturnValue

export type Filter<Value = any> = (ctx: Context<Value>) => boolean

export type When<Value = any> = (ctx: Context<Value>) => boolean

export type Run<Value = any> = (ctx: Context<Value>) => void

export type Fork<Value = any> = (ctx: Context<Value>) => string

export type Attempt<Value, ReturnValue> = (ctx: Context<Value>) => ReturnValue

export type Derive<Value> = TDerive<Config, Value>

export type Reaction = TReaction<Config>
