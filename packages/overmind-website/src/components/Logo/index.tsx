import { h } from 'overmind-components'
import * as styles from './styles'

const Logo: React.SFC = () => (
  <div className={styles.wrapper}>
    <div className={styles.circle} />
    <div className={styles.innerCircle} />
    <div className={styles.block} />
    <div className={styles.text}>overmind</div>
  </div>
)

export default Logo
