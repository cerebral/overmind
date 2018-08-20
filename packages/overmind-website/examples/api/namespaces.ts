function createJsCode(view) {
  return [
    {
      fileName: 'app.js',
      code: `
import App, { namespaces } from '${view}'
import moduleA from './modules/moduleA'
import moduleB from './modules/moduleB'

const app = new App(namespaces({
  moduleA,
  moduleB
}), {
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
  namespaces,
  TModules,
  TAction,
  TDerive,
  TCompute,
  TReaction,
  TOperation,
  TConnect
} from '${view}'
import moduleA from './modules/moduleA'
import moduleB from './modules/moduleB'

type Modules = TModules<{
  moduleA: typeof moduleA
  moduleB: typeof moduleB
}>

export type Action<Value = void> = TAction<Value, Modules>
export type Derive = TDerive<Modules>
export type Compute<Value> = TCompute<Value, Modules>
export type Reaction = TReaction<Modules>

export type Do<Value = any> = TOperation.Do<Value, Modules>
export type Filter<Value = any> = TOperation.Filter<Value, Modules>
export type When<Value = any> = TOperation.When<Value, Modules>
export type Fork<Value = any> = TOperation.Fork<Value, Modules>
export type Mutation<Value = any> = TOperation.Mutation<Value, Modules>
export type Map<Value, ReturnValue> =
  TOperation.Map<Value, ReturnValue, Modules>
export type Try<Value, ReturnValue> =
  TOperation.Try<Value, ReturnValue, Modules>

const app = new App(namespaces({
  moduleA,
  moduleB
}), {
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
