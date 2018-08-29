import { connect } from '../../app'
import { Item, Completed } from './elements'

export default connect({
  props: {
    todo: { required: true },
  },
  name: 'Todo',
  render() {
    return (
      <Item nativeOnClick={() => this.app.actions.toggleCompleted(this.todo)}>
        <Completed completed={this.todo.completed}>✔</Completed>{' '}
        {this.todo.title}
      </Item>
    )
  },
})
