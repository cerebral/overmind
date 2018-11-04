import * as React from 'react'
import { Action } from 'overmind'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

let nextTodoId = 0

export const changeNewTodoTitle: Action<ChangeEvent> = ({
  value: event,
  state,
}) => {
  state.newTodoTitle = event.target.value
}

export const addTodo: Action = ({ state }) => {
  state.todos.unshift({
    id: String(nextTodoId++),
    title: state.newTodoTitle,
    completed: false,
  })
  state.newTodoTitle = ''
}

export const toggleCompleted: Action<string> = ({ value: todoId, state }) => {
  const todo = state.todos.find((todo) => todo.id === todoId)
  todo.completed = !todo.completed
}
