import { createElement, SFC } from 'react'
import * as styles from './styles'

const Loader: SFC = () => (
  <div className={styles.wrapper}>
    <div className={styles.circle} />
    <div className={styles.innerCircle} />
    <div className={styles.block} />
    <div className={styles.text}>loading</div>
  </div>
)

export default Loader
