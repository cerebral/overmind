import { createElement, SFC } from 'react'
import * as styles from './styles'
import { useScrollToPosition } from '../../utils'

type Props = {
  url: string
}

const Doc: SFC<Props> = ({ url, children }) => {
  useScrollToPosition(url)

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
