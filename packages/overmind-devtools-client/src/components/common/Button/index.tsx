import * as React from 'react'
import * as styles from './styles'

type Props = {
  onClick?: () => void
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean
  children?: React.ReactNode
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
