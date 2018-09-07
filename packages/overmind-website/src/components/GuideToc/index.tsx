import * as React from 'react'
import { Wrapper } from './elements'

type Props = {
  toc: any
}

class GuideToc extends React.Component<Props> {
  renderLinks(links) {
    return (
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <a href={`#${link.id}`}>{link.title}</a>
            {link.children.length ? this.renderLinks(link.children) : null}
          </li>
        ))}
      </ul>
    )
  }
  render() {
    return (
      <Wrapper>
        <h6>TABLE OF CONTENTS</h6>
        {this.renderLinks(this.props.toc[0].children)}
      </Wrapper>
    )
  }
}

export default GuideToc
