import { tsAppIndex } from '../templates'

export default (ts, view) =>
  ts
    ? [
        {
          fileName: 'overmind/onInitialize.ts',
          code: `
import { OnInitialize } from 'overmind'

const onInitialize: OnInitialize = async ({ state, localStorage }, overmind) => {
  overmind.addMutationListener((mutation) => {
    if (mutation.path.indexOf('todos') === 0) {
      localStorage.set('todos', state.todos)
    }
  })
}

export default onInitialize
`,
        },
      ]
    : [
        {
          fileName: 'overmind/onInitialize.js',
          code: `
const onInitialize = async ({ state, localStorage }, overmind) => {
  overmind.addMutationListener((mutation) => {
    if (mutation.path.indexOf('todos') === 0) {
      localStorage.set('todos', state.todos)
    }
  })
}

export default onInitialize
`,
        },
      ]
