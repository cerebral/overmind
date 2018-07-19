import { derived } from 'overmind'

export type Todo = {
  id: string
  title: string
  completed: boolean
}

export type State = {
  todos: Todo[]
  newTodoTitle: string
  count: number
}

const state: State = {
  todos: [],
  count: derived((state: State) => state.todos.length),
  newTodoTitle: '',
}

export default state
