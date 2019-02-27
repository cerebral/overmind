export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/onInitialize.ts',
          code: `
import { OnInitialize, rehydrate } from 'overmind'

export const onInitialize: OnInitialize = ({ state }) => {
  const mutations = window.__OVERMIND_MUTATIONS

  rehydrate(state, mutations)
}
`,
        },
      ]
    : [
        {
          fileName: 'overmind/onInitialize.js',
          code: `
import { rehydrate } from 'overmind'

export const onInitialize = ({ state }) => {
  const mutations = window.__OVERMIND_MUTATIONS

  rehydrate(state, mutations)
}
`,
        },
      ]
