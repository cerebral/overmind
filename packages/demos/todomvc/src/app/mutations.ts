import { State, Todo } from './state'

let nextTodoId = 0

export const setNewTodoTitle = (value: string, state: State) =>
  (state.newTodoTitle = value)

export const addTodo = (_, state: State) =>
  state.todos.unshift({
    id: String(nextTodoId++),
    title: state.newTodoTitle,
    completed: false,
  })

export const clearNewTodoTitle = (_, state: State) => (state.newTodoTitle = '')

export const toggleCompleted = (todo: Todo) =>
  (todo.completed = !todo.completed)
