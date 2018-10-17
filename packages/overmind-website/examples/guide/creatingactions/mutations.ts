export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/mutations.js',
          code: `
import { Operation } from 'overmind'

export const setValue: Operation.Mutate = ({ state }) =>
  state.value = 'foo'

export const setValueFromAction: Operation.Mutate<string> = ({ state, value }) =>
  state.value2 = value

export const setValueFromState: Operation.Mutate = ({ state }) =>
  state.value3 = state.value
  `,
        },
        {
          fileName: 'app/actions.js',
          code: `
import { Action } from 'overmind'
import * as mutations from './mutations'

export const setValues: Action<string> = action =>
  action
    .mutate(mutations.setValue)
    .mutate(mutations.setValueFromAction)
    .mutate(mutations.setValueFromState)
  `,
        },
      ]
    : [
        {
          fileName: 'app/mutations.js',
          code: `
export const setValue = ({ state }) =>
  state.value = 'foo'

export const setValueFromAction = ({ state, value }) =>
  state.value2 = value

export const setValueFromState = ({ state }) =>
  state.value3 = state.value
  `,
        },
        {
          fileName: 'app/actions.js',
          code: `
import * as mutations from './mutations'

export const setValues = action =>
  action
    .mutate(mutations.setValue)
    .mutate(mutations.setValueFromAction)
    .mutate(mutations.setValueFromState)
  `,
        },
      ]
