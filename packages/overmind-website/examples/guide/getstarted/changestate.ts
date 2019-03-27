import { tsAppIndex } from '../../templates'

const javascript = {
  react: [
    {
      fileName: 'overmind/index.js',
      code: `
import { createOvermind } from 'overmind'
import { createHook } from 'overmind-react'

export const overmind = createOvermind({
  state: {
    count: 0
  },
  actions: {
    changeCount({ state }, countChange) {
      state.count += countChange
    }
  }
})

export const useOvermind = createHook(overmind)
`,
    },
  ],
  vue: [
    {
      fileName: 'overmind/index.js',
      code: `
import { createOvermind } from 'overmind'
import { createPlugin } from 'overmind-vue'

export const overmind = createOvermind({
  state: {
    count: 0
  },
  actions: {
    changeCount({ state }, countChange) {
      state.count += countChange
    }
  }
})

export const OvermindPlugin = createPlugin(overmind)
`,
    },
  ],
}

const typescript = {
  react: [
    {
      fileName: 'overmind/actions.ts',
      code: `
import { Action } from 'overmind'

export const changeCount: Action<number> = ({ state }, countChange) => {
  state.count += countChange
}
`,
    },
    {
      fileName: 'overmind/index.ts',
      code: tsAppIndex(
        'react',
        `
import { state } from './state'
import * as actions from './actions'

const config = {
  state,
  actions
}
`
      ),
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'overmind/actions.ts',
      code: `
import { Action } from 'overmind'

export const changeCount: Action<number> = ({ state }, countChange) => {
  state.count += countChange
}
`,
    },
    {
      fileName: 'overmind/index.ts',
      code: tsAppIndex(
        'angular',
        `
import { state } from './state'
import * as actions from './actions'

const config = {
  state,
  actions
}
`
      ),
    },
  ],
}

export default (ts, view) => (ts ? typescript[view] : javascript[view])
