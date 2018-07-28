import { derive, compute } from 'overmind'

export type Todo = {
  id: string
  title: string
  completed: boolean
}

export type State = {
  todos: Todo[]
  newTodoTitle: string
  count: number
  testCount: (foo: number) => number
}

const state: State = {
  todos: [],
  count: derive((state: State) => state.todos.length),
  newTodoTitle: '',
  testCount: compute((foo: number) => (state: State) => state.count + foo),
}

export default state
