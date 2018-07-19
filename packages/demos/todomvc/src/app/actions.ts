import * as React from 'react'
import { Action } from './'
import { Todo } from './state'
import * as helpers from './helpers'
import * as mutations from './mutations'

export default (action: Action) => ({
  changeNewTodoTitle: action<React.ChangeEvent<HTMLInputElement>>()
    .map(helpers.getEventValue)
    .mutation(mutations.setNewTodoTitle),
  addTodo: action<React.FormEvent>()
    .do(helpers.preventEventDefault)
    .mutation(mutations.addTodo)
    .mutation(mutations.clearNewTodoTitle),
  toggleCompleted: action<Todo>().mutation(mutations.toggleCompleted),
})
