import { derive, compute } from 'overmind'

const state = {
  todos: [],
  count: derive((state) => state.todos.length),
  newTodoTitle: '',
  testCount: compute((foo) => (state) => state.count + foo),
}

export default state
