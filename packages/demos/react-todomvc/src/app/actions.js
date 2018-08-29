import * as helpers from './helpers'
import * as mutations from './mutations'

export default (action) => ({
  changeNewTodoTitle: action()
    .map(helpers.getEventValue)
    .mutation(mutations.setNewTodoTitle),
  addTodo: action()
    .do(helpers.preventEventDefault)
    .mutation(mutations.addTodo)
    .mutation(mutations.clearNewTodoTitle),
  toggleCompleted: action().mutation(mutations.toggleCompleted),
})
