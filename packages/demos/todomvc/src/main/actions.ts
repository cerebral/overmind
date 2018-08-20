import * as React from 'react'
import { Action } from '../app'
import { Todo } from './state'
import * as operations from './operations'
import * as mutations from './mutations'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export const changeNewTodoTitle: Action<ChangeEvent> = (action) =>
  action<ChangeEvent>()
    .map(operations.getEventValue)
    .mutation(mutations.setNewTodoTitle)

export const addTodo: Action<React.FormEvent> = (action) =>
  action<React.FormEvent>()
    .do(operations.preventEventDefault)
    .mutation(mutations.addTodo)
    .mutation(mutations.clearNewTodoTitle)

export const toggleCompleted: Action<Todo> = (action) =>
  action<Todo>().mutation(mutations.toggleCompleted)
