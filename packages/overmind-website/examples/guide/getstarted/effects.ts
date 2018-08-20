function createJsCode(view) {
  return [
    {
      fileName: 'main/effects.js',
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
      fileName: 'main/index.js',
      code: `
  import state from './state'
  import * as actions from './actions'
  import * as effects from './effects'
  
  export { state, actions, effects }
      `,
    },
  ]
}

function createTsCode(view) {
  return [
    {
      fileName: 'main/effects.ts',
      code: `
import { Post } from './state'
      
export const jsonPlaceholder = {
  getPosts()<Promise<Post[]>> {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
  }
}
        `,
    },
    {
      fileName: 'main/index.js',
      code: `
  import state from './state'
  import * as actions from './actions'
  import * as effects from './effects'
  
  export { state, actions, effects }
      `,
    },
  ]
}

export const react = createJsCode('react-overmind')

export const reactTs = createTsCode('react-overmind')

export const vue = createJsCode('vue-overmind')

export const vueTs = createTsCode('vue-overmind')
