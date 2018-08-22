import tsAppIndex from '../../tsAppIndex'

function createJsCode(view) {
  return [
    {
      fileName: 'app/effects.js',
      code: `
export const jsonPlaceholder = {
  getPosts() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
  }
}
        `,
    },
    {
      fileName: 'app/index.js',
      code: `
  import App from '${view}'
  import * as state from './state'
  import * as actions from './actions'
  import * as effects from './effects'
  
  const app = new App({
    state,
    actions,
    effects
  })
  
  export default app
      `,
    },
  ]
}

function createTsCode(view) {
  return [
    {
      fileName: 'app/effects.ts',
      code: `
import { Post } from './state'
      
export const jsonPlaceholder = {
  getPosts(): Promise<Post[]> {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
  }
}
        `,
    },
    {
      fileName: 'app/index.js',
      code: tsAppIndex(
        view,
        `
import * as state from './state'
import * as actions from './actions'
import * as effects from './effects'

const config = {
  state,
  actions,
  effects
}
      `
      ),
    },
  ]
}

export const react = createJsCode('react-overmind')

export const reactTs = createTsCode('react-overmind')

export const vue = createJsCode('vue-overmind')

export const vueTs = createTsCode('vue-overmind')
