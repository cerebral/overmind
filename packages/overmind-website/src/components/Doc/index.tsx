import { createElement, SFC } from 'react'
import * as styles from './styles'
import { useScrollToTop } from '../../utils'

type Props = {
  url: string
}

const Doc: SFC<Props> = ({ url, children }) => {
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
