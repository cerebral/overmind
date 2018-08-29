import * as React from 'react'
import GuideToc from '../GuideToc'
import Doc from '../Doc'
import { Wrapper } from './elements'
import { compile } from '../../utils'

type State = {
  content: string
}

type Props = {
  currentPath: string
}

class Guide extends React.Component<Props, State> {
  state = {
    content: null,
  }
  componentDidMount() {
    const pathArray = this.props.currentPath.split('/')
    const name = pathArray.pop()
    const type = pathArray.pop()
    import('../../../guides/' + type + '/' + name + '.md').then((module) =>
      this.setState({ content: module })
    )
  }
  render() {
    if (!this.state.content) {
      return null
    }

    const compiled = compile(this.state.content)

    return (
      <Wrapper>
        <Doc>{compiled.tree}</Doc>
        <GuideToc toc={compiled.toc} />
      </Wrapper>
    )
  }
}

export default Guide
