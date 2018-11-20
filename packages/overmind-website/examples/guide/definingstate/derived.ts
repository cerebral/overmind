export default (ts) =>
  ts
    ? [
        {
          fileName: 'app/state.ts',
          code: `
import { Derive } from 'overmind'

export type State = {
  title: string
  upperTitle: Derive<State, string>
}

export const state: State = {
  title: 'My awesome title',
  upperTitle: state => state.title.toUpperCase()
}
  `,
        },
      ]
    : [
        {
          fileName: 'app/state.js',
          code: `
export const state = {
  title: 'My awesome title',
  upperTitle: state => state.title.toUpperCase()
}
  `,
        },
      ]
