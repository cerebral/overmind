export default () => [
  {
    code: `
import {
  IConfig,
  IOnInitialize,
  IAction,
  IOperator,
  IDerive,
  TStateObject
} from 'overmind'

const config = {}

type Config = IConfig<typeof config>

export interface OnInitialize extends IOnInitialize<Config> {}

export interface Action<Input = void> extends IAction<Config, Input> {}

export interface Operator<Input = void, Output = Input> extends IOperator<Config, Input, Output> {}

export interface Derive<Parent extends TStateObject, Output> extends IDerive<Config, Parent, Output> {}
        `,
  },
]
