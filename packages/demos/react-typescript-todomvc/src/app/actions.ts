import * as React from 'react'

import { Action } from './'
import * as mutations from './mutations'
import * as operations from './operations'
import { Todo } from './state'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export const changeNewTodoTitle: Action<ChangeEvent, string> = (action) =>
  action.map(operations.getEventValue).mutate(mutations.setNewTodoTitle)

export const addTodo: Action<React.FormEvent> = (action) =>
  action
    .run(operations.preventEventDefault)
    .mutate(mutations.addTodo)
    .mutate(mutations.clearNewTodoTitle)

export const toggleCompleted: Action<Todo> = ({ mutate }) =>
  mutate(mutations.toggleCompleted)
