import { derive } from 'overmind'
import * as derived from './derived'

export type Todo = {
  id: string
  title: string
  completed: boolean
}

export const todos: Todo[] = []

export let newTodoTitle: string = ''

export const count: number = derive(derived.count)
