import App, {
  TConfig,
  TConnect,
  TAction,
  TOperation,
  TDerive,
  TCompute,
} from 'react-overmind'
import * as effects from './effects'
import * as actions from './actions'
import * as state from './state'

const config = {
  effects,
  actions,
  state,
}

type Config = TConfig<typeof config>

export type Action<Value = void> = TAction<Value, Config>
export type Derive = TDerive<Config>
export type Compute<Value> = TCompute<Value, Config>
export type Mutation<Value = any> = TOperation.Mutation<Value, Config>
export type Do<Value = any> = TOperation.Do<Value, Config>
export type Filter<Value = any> = TOperation.Filter<Value, Config>
export type When<Value = any> = TOperation.When<Value, Config>
export type Fork<Value = any> = TOperation.Fork<Value, Config>
export type Map<Value, ReturnValue> = TOperation.Map<Value, ReturnValue, Config>
export type Try<Value, ReturnValue> = TOperation.Try<Value, ReturnValue, Config>

const app = new App(config, {
  devtools: 'localhost:1234',
})

export type Connect = TConnect<typeof app>

export const connect = app.connect

export default app
