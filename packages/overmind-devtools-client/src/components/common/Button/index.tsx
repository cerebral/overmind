import * as React from 'react'
import * as styles from './styles'

type Props = {
  onClick?: () => void
  type?: string
  disabled?: boolean
}

const Button: React.FunctionComponent<Props> = ({
  type,
  disabled,
  onClick,
  children,
}) => (
  <button
    className={styles.button}
    type={type}
    disabled={disabled}
    onClick={onClick ? () => onClick() : null}
  >
    {children}
  </button>
)

export default Button
