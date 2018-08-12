function createJsCode(view) {
  return [
    {
      fileName: 'app/index.js',
      code: `
import App from '${view}'

const app = new App({
  state: {},
  actions: (action) => ({}),
  effects: {},
  reactions: (reaction, action) => ({})
}, {
  devtools: 'localhost:1234'
})

export const connect = app.connect
  `,
    },
  ]
}

function createTsCode(view) {
  return [
    {
      fileName: 'app/index.ts',
      code: `
import App, { TEffects, TAction, TConnect } from '${view}'

type State = {}

const state: State = {}

const effects = {}

export type Effects = TEffects<State, {}>

export type Action = TAction<State, Effects>

const app = new App({
  state,
  actions: (action) => ({}),
  effects,
  reactions: (reaction, action) => ({})
}, {
  devtools: 'localhost:1234'
})

export type Connect = TConnect<typeof app.state, typeof app.actions>

export const connect = app.connect
  `,
    },
  ]
}

export const react = createJsCode('react-overmind')

export const reactTs = createTsCode('react-overmind')

export const vue = createJsCode('vue-overmind')

export const vueTs = createTsCode('vue-overmind')
