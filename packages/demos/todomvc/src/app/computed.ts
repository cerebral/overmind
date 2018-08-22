import { Compute } from '../app'

export const testCount: Compute<number> = (foo) => (state) => state.count + foo
