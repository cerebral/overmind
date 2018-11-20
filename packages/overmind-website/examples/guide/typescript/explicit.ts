export default () => [
  {
    code: `
import {
  TConfig,
  TOnInitialize,
  TAction,
  TOperator,
  TDerive,
  TReaction
} from 'overmind'

const config = {}

export type Config = TConfig<typeof config>

export type OnInitialize = TOnInitialize<Config>

export type Action<Input> = TAction<Config, Input>

export type Operator<Input, Output> = TOperator<Config, Input, Output>

export type Derive<Parent extends object, Output> = TDerive<Config, Parent, Output>

export type Reaction = TReaction<Config>
        `,
  },
]
