export default (view, config) => `
import App, {
  TConfig,
  TAction,
  TDerive,
  TCompute,
  TReaction,
  TOperation,
  TConnect
} from '${view}'
${config.trim()}

type Config = TConfig<typeof config>

export type Action<Input = void> = TAction<Input, Config>
export type Derive = TDerive<Config>
export type Compute<Input> = TCompute<Input, Config>
export type Reaction = TReaction<Config>

export type Do<Input = any> = TOperation.Do<Input, Config>
export type Filter<Input = any> = TOperation.Filter<Input, Config>
export type When<Input = any> = TOperation.When<Input, Config>
export type Fork<Input = any> = TOperation.Fork<Input, Config>
export type Mutation<Input = any> = TOperation.Mutation<Input, Config>
export type Map<Input, Output> = TOperation.Map<Input, Output, Config>
export type Try<Input, Output> = TOperation.Try<Input, Output, Config>

const app = new App(main)

export type Connect = TConnect<typeof app>

export default app
`
