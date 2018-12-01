import { h } from 'overmind-components'
import * as styles from './styles'
import { Component } from '../../app'

type Props = {
  toc: any
}

function renderLinks(links) {
  return (
    <ul>
      {links.map((link) => (
        <li key={link.id}>
          <a href={`#${link.id}`}>{link.title}</a>
          {link.children.length ? renderLinks(link.children) : null}
        </li>
      ))}
    </ul>
  )
}

const GuideToc: Component<Props> = ({ toc }) => {
  return (
    <div className={styles.wrapper}>
      <h6>TABLE OF CONTENTS</h6>
      {renderLinks(toc[0].children)}
    </div>
  )
}

export default GuideToc
