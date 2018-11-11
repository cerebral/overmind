import { Overmind } from 'overmind'
import { createHook } from 'overmind-react'

const app = new Overmind({
  state: {
    todos: [],
    newTodoTitle: '',
    count: (state) => state.todos.length,
  },
  actions: {
    changeNewTodoTitle({ value: event, state }) {
      state.newTodoTitle = event.target.value
    },
    addTodo({ value: event, state }) {
      event.preventDefault()
      state.todos.unshift({
        title: state.newTodoTitle,
        completed: false,
      })
      state.newTodoTitle = ''
    },
    toggleCompleted({ value: todo }) {
      todo.completed = !todo.completed
    },
  },
})

export const useOvermind = createHook(app)

export default app
