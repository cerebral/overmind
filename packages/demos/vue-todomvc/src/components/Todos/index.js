import { connect } from '../../app'
import { List } from './elements'
import Todo from '../Todo'

export default connect({
  name: 'Todos',
  render() {
    return (
      <List>
        {this.app.state.todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
      </List>
    )
  },
})
