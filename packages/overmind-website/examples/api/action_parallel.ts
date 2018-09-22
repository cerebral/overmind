export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/actions.ts',
          code: `
export const goDoSomething: Action<any> = action =>
  action

export const goDoSomethingElse: Action<string> = action =>
  action

export const doThis: Action<string> = action =>
  action
    .parallel([
      goDoSomething,
      goDoSomethingElse
    ])
    `,
        },
      ]
    : [
        {
          fileName: 'app/actions.js',
          code: `
export const goDoSomething = action =>
  action

export const goDoSomethingElse = action =>
  action

export const doThis = action =>
  action
    .parallel([
      goDoSomething,
      goDoSomethingElse
    ])
    `,
        },
      ]
