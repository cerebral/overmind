import { h } from 'overmind-components'
import * as styles from './styles'
import { Component } from '../../app'
import { useScrollToTop } from '../../utils'

type Props = {
  url: string
}

const Doc: Component<Props> = ({ url, children }) => {
  useScrollToTop(url)

  return (
    <div className={styles.content}>
      <a className={styles.edit} href={url} target="_blank">
        edit on github
      </a>
      {children}
    </div>
  )
}

export default Doc
