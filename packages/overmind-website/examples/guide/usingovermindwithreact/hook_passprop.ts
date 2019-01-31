export default (ts) =>
  ts
    ? [
        {
          fileName: 'components/Todos.tsx',
          code: `
import * as React from 'react'
import { useOvermind } from '../overmind'
import Todo from './Todo'

const Todos: React.FunctionComponent = () => {
  const { state } = useOvermind()

  return (
    <ul>
      {state.todos.map(todo => <Todo key={todo.id} todo={todo} />)}
    </ul<
  )
}

export default Todos
`,
        },
        {
          fileName: 'components/Todo.tsx',
          code: `
import * as React from 'react'
import { useOvermind } from '../overmind'

type Props = {
  todo: Todo
}

const Todo: React.FunctionComponent<Props> = ({ todo }) => {
  useOvermind()

  return <li>{todo.title}</li>
}

export default Todo
`,
        },
      ]
    : [
        {
          fileName: 'components/Todos.jsx',
          code: `
import React from 'react'
import { useOvermind } from '../overmind'
import Todo from './Todo'

const Todos = () => {
  const { state } = useOvermind()

  return (
    <ul>
      {state.todos.map(todo => <Todo key={todo.id} todo={todo} />)}
    </ul<
  )
}

export default Todos
`,
        },
        {
          fileName: 'components/Todo.jsx',
          code: `
import React from 'react'
import { useOvermind } from '../overmind'

const Todo = ({ todo }) => {
  useOvermind()

  return <li>{todo.title}</li>
}

export default Todo
`,
        },
      ]
