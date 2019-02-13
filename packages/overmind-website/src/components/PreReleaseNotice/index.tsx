import { createElement, SFC, useRef, useEffect } from 'react'
import { css } from 'emotion'
import * as styles from './styles'

type Props = {
  className?: string
}

const PreReleaseNotice: SFC<Props> = (props) => {
  return (
    <div {...props} className={css(styles.notice, props.className)}>
      PRE-RELEASE
    </div>
  )
}

export default PreReleaseNotice
