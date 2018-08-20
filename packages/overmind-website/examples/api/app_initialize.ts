function createJsCode(view) {
  return [
    {
      fileName: 'app.js',
      code: `
import App from '${view}'
import * as main from './main'

const app = new App(main, {
  devtools: 'localhost:1234'
})

export default app
  `,
    },
  ]
}

function createTsCode(view) {
  return [
    {
      fileName: 'app.ts',
      code: `
import App, {
  TModule,
  TAction,
  TDerive,
  TCompute,
  TReaction,
  TOperation,
  TConnect
} from '${view}'
import * as main from './main'

type Module = TModule<typeof main>

export type Action<Value = void> = TAction<Value, Module>
export type Derive = TDerive<Module>
export type Compute<Value> = TCompute<Value, Module>
export type Reaction = TReaction<Module>

export type Do<Value = any> = TOperation.Do<Value, Module>
export type Filter<Value = any> = TOperation.Filter<Value, Module>
export type When<Value = any> = TOperation.When<Value, Module>
export type Fork<Value = any> = TOperation.Fork<Value, Module>
export type Mutation<Value = any> = TOperation.Mutation<Value, Module>
export type Map<Value, ReturnValue> =
  TOperation.Map<Value, ReturnValue, Module>
export type Try<Value, ReturnValue> =
  TOperation.Try<Value, ReturnValue, Module>

const app = new App(main, {
  devtools: 'localhost:1234'
})

export type Connect = TConnect<typeof app>

export default app
  `,
    },
  ]
}

export const react = createJsCode('react-overmind')

export const reactTs = createTsCode('react-overmind')

export const vue = createJsCode('vue-overmind')

export const vueTs = createTsCode('vue-overmind')
