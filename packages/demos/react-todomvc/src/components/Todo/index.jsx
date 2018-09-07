import * as React from 'react'
import { connect } from '../../app'
import { Item, Completed } from './elements'

const Todo = ({ todo, app }) => (
  <Item onClick={() => app.actions.toggleCompleted(todo)}>
    <Completed completed={todo.completed}>✔</Completed> {todo.title}
  </Item>
)

export default connect(Todo)
