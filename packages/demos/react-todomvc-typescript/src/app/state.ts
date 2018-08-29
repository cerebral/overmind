import { derive, compute } from 'overmind'
import * as derived from './derived'
import * as computed from './computed'

export type Todo = {
  id: string
  title: string
  completed: boolean
}

export const todos: Todo[] = []

export let newTodoTitle: string = ''

export const count: number = derive(derived.count)

export const testCount: (foo: number) => number = compute(computed.testCount)
