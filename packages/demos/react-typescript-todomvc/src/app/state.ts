import { Derive } from './'

export type Todo = {
  id: string
  title: string
  completed: boolean
}

export const todos: Todo[] = []

export let newTodoTitle: string = ''

export const count: Derive<number> = (state) => state.todos.length
