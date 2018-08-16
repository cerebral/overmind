function createJsCode(view) {
  return [
    {
      fileName: 'app.js',
      code: `
import App from '${view}'

const app = new App({
  state: {
    isLoadingPosts: false
  }
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

export type State = {
  isLoadingPosts: boolean
}

const state: State = {
  isLoadingPosts: false
}

const app = new App({
  state
})

export type Connect = TConnect<typeof app.state>

export default app
        `,
    },
  ]
}

export const react = createJsCode('react-overmind')

export const reactTs = createTsCode('react-overmind')

export const vue = createJsCode('vue-overmind')

export const vueTs = createTsCode('vue-overmind')
