import { Compute } from 'overmind'

export const testCount: Compute<number, number> = (foo) => (state) =>
  state.count + foo
