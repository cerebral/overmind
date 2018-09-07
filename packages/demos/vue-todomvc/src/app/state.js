import { derive } from 'overmind'

export const todos = []

export const count = derive((state) => state.todos.length)

export let newTodoTitle = ''
