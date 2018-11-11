import * as React from 'react'
import { useOvermind } from '../../app'
import { Wrapper, Input, Button, Form } from './elements'

function AddTodo() {
  const { state, actions } = useOvermind()

  return (
    <Wrapper>
      <Form onSubmit={actions.addTodo}>
        <Input
          placeholder="I need to..."
          value={state.newTodoTitle}
          onChange={actions.changeNewTodoTitle}
        />
        <Button disabled={!state.newTodoTitle}>add</Button>
      </Form>
    </Wrapper>
  )
}

export default AddTodo
