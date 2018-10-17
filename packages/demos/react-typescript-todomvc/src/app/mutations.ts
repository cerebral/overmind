import { Operation } from 'overmind'
import { Todo } from './state'

let nextTodoId = 0

export const setNewTodoTitle: Operation.Mutate<string> = ({ state, value }) =>
  (state.newTodoTitle = value)

export const addTodo: Operation.Mutate = ({ state }) =>
  state.todos.unshift({
    id: String(nextTodoId++),
    title: state.newTodoTitle,
    completed: false,
  })

export const clearNewTodoTitle: Operation.Mutate = ({ state }) =>
  (state.newTodoTitle = '')

export const toggleCompleted: Operation.Mutate<Todo> = ({ value: todo }) =>
  (todo.completed = !todo.completed)
