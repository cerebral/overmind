export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/onInitialize.ts',
          code: `
import { OnInitialize, rehydrate } from 'overmind'

export const onInitialize: OnInitialize = ({ state, effects }) => {
  // Grab mutations from a server rendered version
  const mutations = window.__OVERMIND_MUTATIONS

  rehydrate(state, mutations)

  // Grab a previous copy of the state, for example stored in
  // localstorage
  rehydrate(state, effects.storage.get('previousState') || {})
}
`,
        },
      ]
    : [
        {
          fileName: 'overmind/onInitialize.js',
          code: `
import { rehydrate } from 'overmind'

export const onInitialize = ({ state, effects }) => {
  // Grab mutations from a server rendered version
  const mutations = window.__OVERMIND_MUTATIONS

  rehydrate(state, mutations)

  // Grab a previous copy of the state, for example stored in
  // localstorage
  rehydrate(state, effects.storage.get('previousState') || {})
}
`,
        },
      ]
