export default (ts) =>
  ts
    ? [
        {
          fileName: 'components/Todos.tsx',
          code: `
import * as React from 'react'
import { connect, Connect } from '../overmind'
import Todo from './Todo'

type Props = {} & Connect

const Todos: React.SFC<Props> = ({ overmind }) => {
  const { state } = overmind

  return (
    <ul>
      {state.todos.map(todo => <Todo key={todo.id} todo={todo} />)}
    </ul<
  )
}

export default connect(Todos)
`,
        },
        {
          fileName: 'components/Todo.tsx',
          code: `
import * as React from 'react'
import { connect, Connect } from '../overmind'

type Props = {
  todo: Todo
} & Connect

const Todo: React.SFC<Props> = ({ todo }) => {
  return <li>{todo.title}</li>
}

export default connect(Todo)
`,
        },
      ]
    : [
        {
          fileName: 'components/Todos.jsx',
          code: `
import React from 'react'
import { connect } from '../overmind'
import Todo from './Todo'

const Todos = ({ overmind }) => {
  const { state } = overmind

  return (
    <ul>
      {state.todos.map(todo => <Todo key={todo.id} todo={todo} />)}
    </ul<
  )
}

export default connect(Todos)
`,
        },
        {
          fileName: 'components/Todo.jsx',
          code: `
import React from 'react'
import { connect } from '../overmind'

const Todo = ({ todo }) => {
  return <li>{todo.title}</li>
}

export default connect(Todo)
`,
        },
      ]
