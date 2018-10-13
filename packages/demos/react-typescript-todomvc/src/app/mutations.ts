import { Mutate } from 'overmind'
import { Todo } from './state'

let nextTodoId = 0

export const setNewTodoTitle: Mutate<string> = ({ state, value }) =>
  (state.newTodoTitle = value)

export const addTodo: Mutate = ({ state }) =>
  state.todos.unshift({
    id: String(nextTodoId++),
    title: state.newTodoTitle,
    completed: false,
  })

export const clearNewTodoTitle: Mutate = ({ state }) =>
  (state.newTodoTitle = '')

export const toggleCompleted: Mutate<Todo> = ({ value: todo }) =>
  (todo.completed = !todo.completed)
