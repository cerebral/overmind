export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/onInitialize.ts',
          code: `
import { OnInitialize } from 'overmind'

export const onInitialize: OnInitialize = async ({ effects, actions }) => {
  effects.socket.initialize({
    onMessage: actions.onMessage,
    onStatusChange: actions.onSocketStatusChange
  })
}
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/onInitialize.js',
          code: `
export const onInitialize = async ({ effects, action }) => {
  effects.socket.initialize({
    onMessage: actions.onMessage,
    onStatusChange: actions.onSocketStatusChange
  })
}
  `,
        },
      ]
