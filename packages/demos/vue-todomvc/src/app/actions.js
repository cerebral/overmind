import * as operations from './operations'
import * as mutations from './mutations'

export const changeNewTodoTitle = (action) =>
  action()
    .map(operations.getEventValue)
    .mutate(mutations.setNewTodoTitle)

export const addTodo = (action) =>
  action()
    .do(operations.preventEventDefault)
    .mutate(mutations.addTodo)
    .mutate(mutations.clearNewTodoTitle)

export const toggleCompleted = (action) =>
  action().mutate(mutations.toggleCompleted)
