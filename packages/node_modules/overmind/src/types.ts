import { ResolveActions, ResolveState, TBaseContext } from './internalTypes'
import { Overmind } from './'

/** ===== PUBLIC API
 */
export { EventType } from './internalTypes'

export type Configuration = {
  onInitialize?: any
  state?: {}
  effects?: {}
  actions?: {}
}

export type BaseApp = {
  state: {}
  effects: {}
  actions: {}
}

export type TStateObject =
  | {
      [key: string]:
        | TStateObject
        | string
        | IDerive<any, any, any>
        | number
        | boolean
        | object
    }
  | undefined

export interface IConfig<ThisConfig extends Configuration> {
  state: ThisConfig['state'] & {}
  actions: ThisConfig['actions'] & {}
  effects: ThisConfig['effects'] & {}
}

// This is the type of the `app` argument passed in components.
export type TApp<ThisConfig extends Configuration> = {
  // Resolves `Derive` types in state.
  state: ResolveState<ThisConfig['state']>
  actions: ResolveActions<ThisConfig['actions']>
  effects: ThisConfig['effects']
}

// This is the type of the argument passed in actions.
export type TValueContext<
  ThisConfig extends Configuration,
  Value
> = TBaseContext<ThisConfig> & {
  value: Value
}

export interface IAction<ThisConfig extends Configuration, Value> {
  (context: TValueContext<ThisConfig, Value>): any
}

export type IOperator<
  ThisConfig extends Configuration,
  Input,
  Output = Input
> = (
  err: Error | null,
  val: TValueContext<ThisConfig, Input>,
  next: (err: Error | null, val?: TValueContext<ThisConfig, Output>) => void,
  final?: (err, Error, val?: TValueContext<ThisConfig, Output>) => void
) => void

export type IDerive<
  ThisConfig extends Configuration,
  Parent extends TStateObject,
  Value
> = (
  parent: ResolveState<Parent>,
  state: ResolveState<ThisConfig['state'] & {}>
) => Value

export interface IOnInitialize<ThisConfig extends Configuration> {
  (context: TValueContext<ThisConfig, Overmind<ThisConfig>>): void
}
