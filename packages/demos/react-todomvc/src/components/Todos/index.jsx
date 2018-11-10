import * as React from 'react'
import { connect } from '../../app'
import { List } from './elements'
import Todo from '../Todo'

const Todos = ({ app }) => (
  <List>
    {app.state.todos.map((todo, index) => <Todo key={index} todo={todo} />)}
  </List>
)

export default connect(Todos)
