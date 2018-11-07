import * as React from 'react'
import { Action } from 'overmind'
import { Todo } from './state'

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

export const toggleCompleted: Action<Todo> = ({ value: todo }) => {
  todo.completed = !todo.completed
}
