import * as React from 'react'
import { connect, Connect } from '../../app'
import { Wrapper, Input, Button, Form } from './elements'

const AddTodo: React.SFC<Connect> = ({ app }) => (
  <Wrapper>
    {app.state.count}
    <Form onSubmit={app.actions.addTodo}>
      <Input
        placeholder="I need to..."
        value={app.state.newTodoTitle}
        onChange={app.actions.changeNewTodoTitle}
      />
      <Button disabled={!app.state.newTodoTitle}>add</Button>
    </Form>
  </Wrapper>
)

export default connect(AddTodo)
