import { connect } from '../../app'
import { Wrapper, Input, Button, Form } from './elements'

export default connect({
  name: 'AddTodo',
  render() {
    return (
      <Wrapper>
        {this.app.state.testCount(5)}
        <Form nativeOnSubmit={this.app.actions.addTodo}>
          <Input
            placeholder="I need to..."
            value={this.app.state.newTodoTitle}
            nativeOnInput={this.app.actions.changeNewTodoTitle}
          />
          <Button disabled={this.app.state.newTodoTitle === ''}>add</Button>
        </Form>
      </Wrapper>
    )
  },
})
