import { createElement, SFC } from 'react'
import * as styles from './styles'
import Icon from '../Icon'

const Footer: SFC = () => {
  return (
    <div className={styles.wrapper}>
      <a
        href="https://github.com/cerebral/overmind"
        target="_new"
        className={styles.github}
      >
        <Icon>github</Icon>
      </a>
      <div className={styles.copy}>
        Released under the{' '}
        <a href="https://opensource.org/licenses/MIT" target="_new">
          MIT License
        </a>
        <div> Copyright © 2019 Christian Alfoni</div>
      </div>
      <a
        href="https://spectrum.chat/overmindjs"
        target="_new"
        className={styles.chat}
      >
        <Icon>chat</Icon>
      </a>
    </div>
  )
}

export default Footer
