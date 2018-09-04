export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/operations.ts',
          code: `
import { Operation } from 'overmind'

export const trackSubmitForm: Operation.Do = ({ track }) =>
  track.interaction('submitForm')
    `,
        },
        {
          fileName: 'app/actions.ts',
          code: `
import { Action } from 'overmind'

export const doThis: Action = action =>
  action()
    .do(operations.trackSubmitForm)
  `,
        },
      ]
    : [
        {
          fileName: 'app/operations.js',
          code: `
export const trackSubmitForm = ({ track }) =>
  track.interaction('submitForm')    
    `,
        },
        {
          fileName: 'app/actions.js',
          code: `
export const doThis = action =>
  action()
    .do(operations.trackSubmitForm)
  `,
        },
      ]
