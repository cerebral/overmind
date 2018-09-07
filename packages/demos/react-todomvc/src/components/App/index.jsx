import * as React from 'react'
import { Wrapper, InnerWrapper } from './elements'
import AddTodo from '../AddTodo'
import Todos from '../Todos'

const App = () => (
  <Wrapper>
    <InnerWrapper>
      <AddTodo />
      <Todos />
    </InnerWrapper>
  </Wrapper>
)

export default App
