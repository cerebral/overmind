import * as React from 'react'
import { useOvermind } from '../../app'
import { Item, Completed } from './elements'

function Todo({ todo }) {
  const { actions } = useOvermind()

  return (
    <Item onClick={() => actions.toggleCompleted(todo)}>
      <Completed completed={todo.completed}>✔</Completed> {todo.title}
    </Item>
  )
}

export default Todo
