export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/onInitialize.ts',
          code: `
import { OnInitialize } from 'overmind'

export const onInitialize: OnInitialize = ({ state }, overmind) => {
  const mutations = window.__OVERMIND_MUTATIONS

  overmind.rehydrate(state, mutations)
}
`,
        },
      ]
    : [
        {
          fileName: 'overmind/onInitialize.js',
          code: `
export const onInitialize = ({ state }, overmind) => {
  const mutations = window.__OVERMIND_MUTATIONS

  overmind.rehydrate(state, mutations)
}
`,
        },
      ]
