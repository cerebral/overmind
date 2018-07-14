import * as React from 'react'
import { connect, Connect } from '../../app'
import { Todo } from '../../app/state'
import { Item, Completed } from './elements'

type Props = {
  todo: Todo
} & Connect

const Todo: React.SFC<Props> = ({ todo, actions }) => (
  <Item onClick={() => actions.toggleCompleted(todo)}>
    <Completed completed={todo.completed}>✔</Completed> {todo.title}
  </Item>
)

export default connect(Todo)
