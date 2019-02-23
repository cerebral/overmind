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
    changeCount({ state, effects }, countChange) {
      state.count += countChange
      effects.bip()
    }
  },
  effects: {
    bip() {
      const context = new AudioContext()
      const o = context.createOscillator()
      const g = context.createGain()
      g.gain.exponentialRampToValueAtTime(
        0.0001, context.currentTime + 1
      )
      o.connect(g)
      g.connect(context.destination)
      o.start(0)
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
    changeCount({ state, effects }, countChange) {
      state.count += countChange
      effects.bip()
    }
  },
  effects: {
    bip() {
      const context = new AudioContext()
      const o = context.createOscillator()
      const g = context.createGain()
      g.gain.exponentialRampToValueAtTime(
        0.0001, context.currentTime + 1
      )
      o.connect(g)
      g.connect(context.destination)
      o.start(0)
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
      fileName: 'overmind/effects.ts',
      code: `
export const bip = () => {
  const context = new AudioContext()
  const o = context.createOscillator()
  const g = context.createGain()
  g.gain.exponentialRampToValueAtTime(
    0.0001, context.currentTime + 1
  )
  o.connect(g)
  g.connect(context.destination)
  o.start(0)
}
`,
    },
    {
      fileName: 'overmind/actions.ts',
      code: `
import { Action } from 'overmind'

export const changeCount: Action<number> = ({ state, effects }, countChange) {
  state.count += countChange
  effects.bip()
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
import * as effects from './effects'

const config = {
  state,
  actions,
  effects
}
`
      ),
    },
  ],
  vue: javascript.vue,
  angular: [
    {
      fileName: 'overmind/effects.ts',
      code: `
export const bip = () => {
  const context = new AudioContext()
  const o = context.createOscillator()
  const g = context.createGain()
  g.gain.exponentialRampToValueAtTime(
    0.0001, context.currentTime + 1
  )
  o.connect(g)
  g.connect(context.destination)
  o.start(0)
}
`,
    },
    {
      fileName: 'overmind/actions.ts',
      code: `
import { Action } from 'overmind'

export const changeCount: Action<number> = ({ state, effects }, countChange) {
  state.count += countChange
  effects.bip()
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
