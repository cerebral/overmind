import { Mutation } from 'overmind'
import { Todo } from './state'

let nextTodoId = 0

export const setNewTodoTitle: Mutation<string> = (state, value) =>
  (state.newTodoTitle = value)

export const addTodo: Mutation = (state) =>
  state.todos.unshift({
    id: String(nextTodoId++),
    title: state.newTodoTitle,
    completed: false,
  })

export const clearNewTodoTitle: Mutation = (state) => (state.newTodoTitle = '')

export const toggleCompleted: Mutation<Todo> = (_, todo) =>
  (todo.completed = !todo.completed)
