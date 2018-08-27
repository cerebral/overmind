import * as React from 'react'
import { Action } from 'overmind'
import { Todo } from './state'
import * as operations from './operations'
import * as mutations from './mutations'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export const changeNewTodoTitle: Action<ChangeEvent> = (action) =>
  action()
    .map(operations.getEventValue)
    .mutation(mutations.setNewTodoTitle)

export const addTodo: Action<React.FormEvent> = (action) =>
  action()
    .do(operations.preventEventDefault)
    .mutation(mutations.addTodo)
    .mutation(mutations.clearNewTodoTitle)
    .map(() => Promise.resolve())
    .map(() => Promise.resolve())

export const toggleCompleted: Action<Todo> = (action) =>
  action().mutation(mutations.toggleCompleted)
