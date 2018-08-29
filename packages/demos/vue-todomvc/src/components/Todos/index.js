import { connect } from '../../app'
import { List } from './elements'
import Todo from '../Todo'

export default connect({
  name: 'Todos',
  render() {
    return (
      <List>
        {this.app.state.todos.map(
          (todo) =>
            console.log('todo ID', todo.id) || (
              <Todo key={todo.id} todo={todo} />
            )
        )}
      </List>
    )
  },
})
