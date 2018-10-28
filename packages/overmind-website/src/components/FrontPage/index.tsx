import * as React from 'react'
import Logo from '../Logo'
import { Wrapper, QuickstartWrapper, Quickstart } from './elements'
import Icon from '../Icon'
import { viewport } from '../../utils'

class FrontPage extends React.Component {
  node: HTMLElement
  componentDidMount() {
    requestAnimationFrame(() => (this.node.style.bottom = '0'))
  }
  render() {
    return (
      <Wrapper>
        <Logo />
        <QuickstartWrapper
          innerRef={(node) => {
            this.node = node
          }}
        >
          <Quickstart href="/videos/overmind-introduction">
            <Icon>movie</Icon>
            {viewport.isMobile ? null : <span>Video introduction</span>}
          </Quickstart>
          <Quickstart href="/guides/beginner/01_getstarted">
            <Icon>guide</Icon>
            {viewport.isMobile ? null : <span>Get started guide</span>}
          </Quickstart>
          <Quickstart href="https://spectrum.chat/overmindjs" target="_blank">
            <Icon>chat</Icon>
            {viewport.isMobile ? null : <span>Chat Support</span>}
          </Quickstart>
        </QuickstartWrapper>
      </Wrapper>
    )
  }
}

export default FrontPage
