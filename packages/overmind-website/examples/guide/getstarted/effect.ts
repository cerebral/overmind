import { tsAppIndex, tsSimpleAppIndex } from '../../templates'

export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/effects.ts',
          code: `
export const bip = (() => {
  const context = new AudioContext()

  return (factor: number) => {
    const o = context.createOscillator()
    const g = context.createGain()

    o.frequency.value = factor * 100
    o.connect(g)
    g.connect(context.destination)

    g.gain.exponentialRampToValueAtTime(
      0.0001, context.currentTime + 1
    )

    o.start(0)
  }
})()
`,
        },
        {
          fileName: 'overmind/index.ts',
          code: tsSimpleAppIndex(
            `
import { state } from './state'
import * as actions from './actions'
import * as effects from './effects'

export const config = {
  state,
  actions,
  effects
}
`
          ),
        },
        {
          fileName: 'overmind/actions.ts',
          code: `
import { Action } from 'overmind'

export const changeCount: Action<number> = ({ state, effects }, countChange) {
  state.count += countChange
  effects.bip(state.count)
}
`,
        },
      ]
    : [
        {
          fileName: 'overmind/index.js',
          code: `
export const config = {
  state: {
    count: 0
  },
  actions: {
    changeCount({ state, effects }, countChange) {
      state.count += countChange
      effects.bip(state.count)
    }
  },
  effects: {
    bip: (() => {
      const context = new AudioContext()
  
      return (factor) => {
        const o = context.createOscillator()
        const g = context.createGain()
    
        o.frequency.value = factor * 100
        o.connect(g)
        g.connect(context.destination)
  
        g.gain.exponentialRampToValueAtTime(
          0.0001, context.currentTime + 1
        )
  
        o.start(0)
      }
    })()
  }
}
`,
        },
      ]
