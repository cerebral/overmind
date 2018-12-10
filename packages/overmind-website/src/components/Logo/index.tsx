import { createElement, SFC } from 'react'
import * as styles from './styles'

const Logo: SFC = () => (
  <div className={styles.wrapper}>
    <div className={styles.circle} />
    <div className={styles.innerCircle} />
    <div className={styles.block} />
    <div className={styles.text}>overmind</div>
  </div>
)

export default Logo
