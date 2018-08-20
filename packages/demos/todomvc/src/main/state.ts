import { derive, compute } from 'overmind'
import * as derived from './derived'
import * as computed from './computed'

export type Todo = {
  id: string
  title: string
  completed: boolean
}

type State = {
  todos: Todo[]
  newTodoTitle: string
  count: number
  testCount: (foo: number) => number
}

const state: State = {
  todos: [],
  newTodoTitle: '',
  count: derive(derived.count),
  testCount: compute(computed.testCount),
}

export default state
