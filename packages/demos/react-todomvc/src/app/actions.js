import * as operations from './operations'
import * as mutations from './mutations'

export const changeNewTodoTitle = (action) =>
  action
    .map(operations.getEventValue)
    .mutate(mutations.setNewTodoTitle)
    .when(() => true, {
      true: (action) => action.run(() => {}).map(() => null),
      false: (action) => action.run(() => {}),
    })

export const addTodo = (action) =>
  action
    .run(operations.preventEventDefault)
    .mutate(mutations.addTodo)
    .mutate(mutations.clearNewTodoTitle)

export const toggleCompleted = ({ mutate }) => mutate(mutations.toggleCompleted)
