import { State, Todo } from './state'

let nextTodoId = 0

export const setNewTodoTitle = (state: State, value: string) =>
  (state.newTodoTitle = value)

export const addTodo = (state: State) =>
  state.todos.unshift({
    id: String(nextTodoId++),
    title: state.newTodoTitle,
    completed: false,
  })

export const clearNewTodoTitle = (state: State) => (state.newTodoTitle = '')

export const toggleCompleted = (_, todo: Todo) =>
  (todo.completed = !todo.completed)
