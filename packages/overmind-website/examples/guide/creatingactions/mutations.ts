export const js = [
  {
    fileName: 'app/mutations.js',
    code: `
export const setValue = state =>
    state.value = 'foo'

export const setValueFromAction = (state, value) =>
  state.value2 = value

export const setValueFromState = state =>
  state.value3 = state.value
  `,
  },
  {
    fileName: 'app/actions.js',
    code: `
import * as mutations from './mutations'

export const setValues = action =>
    action()
      .mutation(mutations.setValue)
      .mutation(mutations.setValueFromAction)
      .mutation(mutations.setValueFromState)
  `,
  },
]

export const ts = [
  {
    fileName: 'app/mutations.js',
    code: `
import { Mutation } from './'

export const setValue: Mutation = state =>
    state.value = 'foo'

export const setValueFromAction: Mutation<string> = (state, value) =>
  state.value2 = value

export const setValueFromState: Mutation = state =>
  state.value3 = state.value
  `,
  },
  {
    fileName: 'app/actions.js',
    code: `
import { Action } from './'
import * as mutations from './mutations'

export const setValues: Action<string> = action =>
    action()
      .mutation(mutations.setValue)
      .mutation(mutations.setValueFromAction)
      .mutation(mutations.setValueFromState)
  `,
  },
]
