export default () => [
  {
    code: `
import {
  TConfig,
  TOnInitialize,
  TAction,
  TOperator,
  TDerive,
  TStateObject
} from 'overmind'

const config = {}

export type Config = TConfig<{
  state: typeof config["state"]
  actions: typeof config["actions"]
  effects: typeof config["effects"]
}>

export type OnInitialize = TOnInitialize<Config>

export type Action<Input = void> = TAction<Config, Input>

export type Operator<Input, Output> = TOperator<Config, Input, Output>

export type Derive<Parent extends TStateObject, Output> = TDerive<Config, Parent, Output>
        `,
  },
]
