export const js = [
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

export const ts = [
  {
    fileName: 'app/operations.ts',
    code: `
export const trackSubmitForm: Do = ({ track }) =>
  track.interaction('submitForm')
    `,
  },
  {
    fileName: 'app/actions.ts',
    code: `
export const doThis: Action = action =>
  action()
    .do(operations.trackSubmitForm)
  `,
  },
]
