let nextTodoId = 0

export function setNewTodoTitle(state, value) {
  state.newTodoTitle = value
}

export function addTodo(state) {
  state.todos.unshift({
    id: String(nextTodoId++),
    title: state.newTodoTitle,
    completed: false,
  })
}

export function clearNewTodoTitle(state) {
  state.newTodoTitle = ''
}

export function toggleCompleted(_, todo) {
  todo.completed = !todo.completed
}
