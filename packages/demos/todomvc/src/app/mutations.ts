import { State, Todo } from './state'

let nextTodoId = 0

export function setNewTodoTitle(state: State, value: string) {
  state.newTodoTitle = value
}

export function addTodo(state: State) {
  state.todos.unshift({
    id: String(nextTodoId++),
    title: state.newTodoTitle,
    completed: false,
  })
}

export function clearNewTodoTitle(state: State) {
  state.newTodoTitle = ''
}

export function toggleCompleted(_, todo: Todo) {
  todo.completed = !todo.completed
}
