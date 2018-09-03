function createJsCode(view) {
  return [
    {
      fileName: 'app/index.js',
      code: `
import App from '${view}'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const app = new App({
  modules: {
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
  modules: {
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

export const react = createJsCode('overmind-react')

export const reactTs = createTsCode('overmind-react')

export const vue = createJsCode('overmind-vue')

export const vueTs = createTsCode('overmind-vue')

export const angularTs = createTsCode('overmind-angular')
