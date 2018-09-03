function createJsCode() {
  return [
    {
      fileName: 'app/moduleA/index.js',
      code: `
export default (namespace) => ({
  state: {},
  effects: {},
  actions: action => ({}),
  reactions: (reaction, action) => ({})
})
        `,
    },
  ]
}

function createTsCode(view) {
  return [
    {
      code: `
import { Namespace } from '${view}'

export default (namespace: Namespace) => ({
  state: {},
  effects: {},
  actions: action => ({}),
  reactions: (reaction, action) => ({})
})
        `,
    },
  ]
}

export const react = createJsCode()

export const reactTs = createTsCode('overmind-react')

export const vue = createJsCode()

export const vueTs = createTsCode('overmind-vue')
