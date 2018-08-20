import * as React from 'react'
import { connect, Connect } from '../../app'
import { Todo as TTodo } from '../../main/state'
import { Item, Completed } from './elements'

type Props = {
  todo: TTodo
} & Connect

const Todo: React.SFC<Props> = ({ todo, app }) => (
  <Item onClick={() => app.actions.toggleCompleted(todo)}>
    <Completed completed={todo.completed}>✔</Completed> {todo.title}
  </Item>
)

export default connect(Todo)
