import { tsAppIndex, tsSimpleAppIndex } from '../../templates'

export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/effects.ts',
          code: `
export const getRandomNumber = (): Promise<number> => {
  return Promise.resolve(
    Math.round(Math.random() * 100)
  )
}
`,
        },
        {
          fileName: 'overmind/actions.ts',
          code: `
import { AsyncAction } from 'overmind'

export const increaseCount: AsyncAction = async ({ state, effects }) => {
  state.count += await effects.getRandomNumber()
}

export const decreaseCount: AsyncAction = async ({ state, effects }) => {
  state.count -= await effects.getRandomNumber()
}
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
      ]
    : [
        {
          fileName: 'overmind/effects.js',
          code: `
export const getRandomNumber = () => {
  return Promise.resolve(
    Math.round(Math.random() * 100)
  )
}
`,
        },
        {
          fileName: 'overmind/actions.js',
          code: `
export const increaseCount = async ({ state, effects }) => {
  state.count += await effects.getRandomNumber()
}

export const decreaseCount = async ({ state, effects }) => {
  state.count -= await effects.getRandomNumber()
}
`,
        },
        {
          fileName: 'overmind/index.js',
          code: `
import { state } from './state'
import * as actions from './actions'
import * as effects from './effects'

export const config = {
  state,
  actions,
  effects
}
`,
        },
      ]
