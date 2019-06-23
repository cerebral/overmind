export default (ts) =>
  ts
    ? [
        {
          fileName: 'overmind/state.ts',
          code: `
import { Derive } from 'overmind'

export type State = {
  counts: {
    [id: string]: number
  }
  totalCountBy: Derive<State, (ids: string[]) => number>
}

export const state: State = {
  counts: {
    a: 2,
    b: 3,
    c: 5
  },
  totalCountBy: state => ids => ids.reduce((aggr, id) => aggr + state.counts[id], 0)
}

// state.totalCountBy(['a', 'b'])
  `,
        },
      ]
    : [
        {
          fileName: 'overmind/state.js',
          code: `
export const state = {
  counts: {
    a: 2,
    b: 3,
    c: 5
  },
  totalCountBy: state => ids => ids.reduce((aggr, id) => aggr + state.counts[id], 0)
}

// state.totalCountBy(['a', 'b'])
  `,
        },
      ]
