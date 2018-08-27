function createJsCode(view) {
  return [
    {
      fileName: 'app/index.js',
      code: `
import App from '${view}'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const app = new App({
  namespaces: {
    moduleA,
    moduleB
  }
}, {
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
import App, { TConnect } from '${view}'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const config = {
  namespaces: {
    moduleA,
    moduleB
  }
}

declare module 'overmind' {
  interface IState extends TState<typeof config> {}
  interface IEffects extends TEffects<typeof config> {}
}


const app = new App(config, {
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
