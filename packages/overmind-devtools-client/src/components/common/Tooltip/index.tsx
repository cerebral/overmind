import * as React from 'react'
import * as styles from './styles'

type Props = {
  text: string
}

const Tooltip: React.FunctionComponent<Props> = ({ text, children }) => (
  <div className={styles.tooltipWrapper}>
    {children}
    <span className={styles.tooltipElement}>
      <span className={styles.tooltipText}>{text}</span>
    </span>
  </div>
)

export default Tooltip
