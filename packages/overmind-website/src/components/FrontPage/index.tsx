import * as React from 'react'
import { getTypescript, getTheme, viewport } from '../../utils'
import Logo from '../Logo'
import {
  Wrapper,
  QuickstartWrapper,
  Quickstart,
  Iframe,
  IframeWrapper,
} from './elements'
import Icon from '../Icon'
import { TDemo } from '../App'

type Props = {
  demos: TDemo[]
}

class FrontPage extends React.Component<Props> {
  node: HTMLElement
  componentDidMount() {
    requestAnimationFrame(() => (this.node.style.bottom = '0'))
  }
  renderDemo() {
    if (!this.props.demos.length) {
      return null
    }

    const typescript = getTypescript()
    const theme = getTheme()
    const view = theme === 'react' && typescript ? 'react_ts' : theme
    const demoUrl = this.props.demos[0].sandboxes[view]
    return (
      <Iframe
        key={demoUrl}
        src={demoUrl}
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      />
    )
  }
  render() {
    return (
      <Wrapper>
        <Logo />
        {viewport.isMobile ? null : (
          <IframeWrapper>{this.renderDemo()}</IframeWrapper>
        )}
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
