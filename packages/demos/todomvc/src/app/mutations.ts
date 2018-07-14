import { State, Todo } from './state'

export const setNewTodoTitle = (value: string, state: State) =>
  (state.newTodoTitle = value)

export const addTodo = (_, state: State) =>
  state.todos.unshift({
    title: state.newTodoTitle,
    completed: false,
  })

export const clearNewTodoTitle = (_, state: State) => (state.newTodoTitle = '')

export const toggleCompleted = (todo: Todo) =>
  (todo.completed = !todo.completed)
