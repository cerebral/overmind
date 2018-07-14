import * as React from 'react'
import { connect, Connect } from '../../app'
import { Wrapper, InnerWrapper } from './elements'
import AddTodo from '../AddTodo'
import Todos from '../Todos'

const App: React.SFC<Connect> = ({ appState, actions }) => (
  <Wrapper>
    <InnerWrapper>
      <AddTodo />
      <Todos />
    </InnerWrapper>
  </Wrapper>
)

export default connect(App)
