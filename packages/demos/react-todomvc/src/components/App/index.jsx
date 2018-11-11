import * as React from 'react'
import { Wrapper, InnerWrapper } from './elements'
import AddTodo from '../AddTodo'
import Todos from '../Todos'

function App() {
  return (
    <Wrapper>
      <InnerWrapper>
        <AddTodo />
        <Todos />
      </InnerWrapper>
    </Wrapper>
  )
}

export default App
