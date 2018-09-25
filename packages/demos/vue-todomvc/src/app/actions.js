import * as operations from './operations'
import * as mutations from './mutations'

export const changeNewTodoTitle = (action) =>
  action.mutate(mutations.setNewTodoTitle)

export const addTodo = (action) =>
  action
    .run(operations.preventEventDefault)
    .mutate(mutations.addTodo)
    .mutate(mutations.clearNewTodoTitle)

export const toggleCompleted = (action) =>
  action.mutate(mutations.toggleCompleted)
