export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/mutations.ts',
          code: `
import { Mutate } from 'overmind'

export const setLoading: Mutate = state =>
  state.isLoading = true

export const setInputValue: Mutate<string> = (state, value) =>
  state.inputValue = value
    `,
        },
        {
          fileName: 'app/actions.ts',
          code: `
import { Action } from 'overmind'

export const doThis: Action<string> = action =>
  action()
    .mutate(mutations.setLoading)
    .mutate(mutations.setInputValue)
  `,
        },
      ]
    : [
        {
          fileName: 'app/mutations.js',
          code: `
export const setLoading = state =>
  state.isLoading = true

export const setInputValue = (state, value) =>
  state.inputValue = value
    `,
        },
        {
          fileName: 'app/actions.js',
          code: `
export const doThis = action =>
  action()
    .mutate(mutations.setLoading)
    .mutate(mutations.setInputValue)
  `,
        },
      ]
