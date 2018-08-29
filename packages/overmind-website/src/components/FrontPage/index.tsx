import * as React from 'react'
import Logo from '../Logo'
import { QuickstartWrapper, Quickstart } from './elements'
import Icon from '../Icon'

const FrontPage: React.SFC = () => (
  <React.Fragment>
    <Logo />
    <QuickstartWrapper>
      <Quickstart>
        <Icon>movie</Icon>
        Video introduction
      </Quickstart>
      <Quickstart href="/guides/beginner/01_getstarted">
        <Icon>guide</Icon>
        Get started guide
      </Quickstart>
      <Quickstart href="https://spectrum.chat/overmindjs" target="_blank">
        <Icon>chat</Icon>
        Chat Support
      </Quickstart>
    </QuickstartWrapper>
  </React.Fragment>
)

export default FrontPage
