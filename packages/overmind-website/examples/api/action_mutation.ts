export const js = [
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
    .mutation(mutations.setLoading)
    .mutation(mutations.setInputValue)
  `,
  },
]

export const ts = [
  {
    fileName: 'app/mutations.ts',
    code: `
import { Mutation } from 'overmind'

export const setLoading: Mutation = state =>
  state.isLoading = true

export const setInputValue: Mutation<string> = (state, value) =>
  state.inputValue = value
    `,
  },
  {
    fileName: 'app/actions.ts',
    code: `
import { Action } from 'overmind'

export const doThis: Action<string> = action =>
  action()
    .mutation(mutations.setLoading)
    .mutation(mutations.setInputValue)
  `,
  },
]
