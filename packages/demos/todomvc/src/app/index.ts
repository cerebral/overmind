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

export type Action<Input = void, Output = any> = TAction<Input, Output, Config>
export type Derive = TDerive<Config>
export type Compute<Input> = TCompute<Input, Config>
export type Mutation<Input = any> = TOperation.Mutation<Input, Config>
export type Do<Input = any> = TOperation.Do<Input, Config>
export type Filter<Input = any> = TOperation.Filter<Input, Config>
export type When<Input = any> = TOperation.When<Input, Config>
export type Fork<Input = any> = TOperation.Fork<Input, Config>
export type Map<Input, Output> = TOperation.Map<Input, Output, Config>
export type Try<Input, Output> = TOperation.Try<Input, Output, Config>

const app = new App(config, {
  devtools: 'localhost:1234',
})

export type Connect = TConnect<typeof app>

export const connect = app.connect

export default app
