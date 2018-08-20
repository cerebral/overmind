export const js = [
  {
    fileName: 'operations.js',
    code: `
export const trackSubmitForm = ({ track }) =>
  track.interaction('submitForm')    
    `,
  },
  {
    fileName: 'actions.js',
    code: `
export const doThis = action =>
  action()
    .do(operations.trackSubmitForm)
  `,
  },
]

export const ts = [
  {
    fileName: 'operations.ts',
    code: `
export const trackSubmitForm: Do = ({ track }) =>
  track.interaction('submitForm')
    `,
  },
  {
    fileName: 'actions.ts',
    code: `
export const doThis: Action = action =>
  action()
    .do(operations.trackSubmitForm)
  `,
  },
]
