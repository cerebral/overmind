import AddTodo from '../AddTodo'
import Todos from '../Todos'
import { Wrapper, InnerWrapper } from './elements'

export default {
  name: 'App',
  render() {
    return (
      <Wrapper>
        <InnerWrapper>
          <AddTodo />
          <Todos />
        </InnerWrapper>
      </Wrapper>
    )
  },
}
