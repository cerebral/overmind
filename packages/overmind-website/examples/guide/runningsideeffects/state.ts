export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/onInitialize.ts',
          code: `
import { OnInitialize } from 'overmind'

export const onInitialize: OnInitialize = async ({ state, effects, actions }) => {
  effects.socket.initialize({
    onMessage: actions.onMessage,
    onStatusChange: actions.onSocketStatusChange,
    getToken() {
      return state.token
    }
  })
}
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/onInitialize.js',
          code: `
export const onInitialize = async ({ state, effects, action }) => {
  effects.socket.initialize({
    onMessage: actions.onMessage,
    onStatusChange: actions.onSocketStatusChange,
    getToken() {
      return state.token
    }
  })
}
  `,
        },
      ]
