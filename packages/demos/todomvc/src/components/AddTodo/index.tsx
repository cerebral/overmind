import * as React from 'react'
import { connect, Connect } from '../../app'
import { Wrapper, Input, Button, Form } from './elements'

const AddTodo: React.SFC<Connect> = ({ appState, actions }) => (
  <Wrapper>
    <Form onSubmit={actions.addTodo}>
      <Input
        placeholder="I need to..."
        value={appState.newTodoTitle}
        onChange={actions.changeNewTodoTitle}
      />
      <Button disabled={!appState.newTodoTitle}>add</Button>
    </Form>
  </Wrapper>
)

export default connect(AddTodo)
