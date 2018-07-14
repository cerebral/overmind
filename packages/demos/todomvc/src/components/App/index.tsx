import * as React from 'react'
import { connect, Connect } from '../../app'
import actions from '../../app/actions'

const App: React.SFC<Connect> = ({ appState, actions }) => (
  <div>
    <h1>hello ({appState.todos.length})</h1>
    <input
      value={appState.newTodoTitle}
      onChange={actions.changeNewTodoTitle}
    />
  </div>
)

export default connect(App)
