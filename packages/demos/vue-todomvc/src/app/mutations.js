let nextTodoId = 0

export const setNewTodoTitle = ({ state, value }) =>
  (state.newTodoTitle = value)

export const addTodo = ({ state }) =>
  state.todos.unshift({
    id: String(nextTodoId++),
    title: state.newTodoTitle,
    completed: false,
  })

export const clearNewTodoTitle = ({ state }) => (state.newTodoTitle = '')

export const toggleCompleted = ({ value: todo }) =>
  (todo.completed = !todo.completed)
