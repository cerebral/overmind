import * as React from 'react'
import { useOvermind } from '../../app'
import { List } from './elements'
import Todo from '../Todo'

function Todos() {
  const { state } = useOvermind()

  return (
    <List>
      {state.todos.map((todo, index) => <Todo key={index} todo={todo} />)}
    </List>
  )
}

export default Todos
