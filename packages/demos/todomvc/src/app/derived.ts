import { Derive } from 'overmind'

export const count: Derive<number> = (state) => state.todos.length
