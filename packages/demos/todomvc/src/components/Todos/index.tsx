import * as React from 'react'
import { connect, Connect } from '../../app'
import { List } from './elements'
import Todo from '../Todo'

const Todos: React.SFC<Connect> = ({ appState }) => (
  <List>
    {appState.todos.map(
      (todo, index) =>
        console.log('todo ID', todo.id) || <Todo key={todo.id} todo={todo} />
    )}
  </List>
)

export default connect(Todos)
