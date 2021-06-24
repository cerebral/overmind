import * as React from 'react'
import * as styles from './styles'

type Props = {
  value: string
  onChange: (value: string) => void
  autoFocus?: boolean
  placeholder?: string
  addon?: any
  length?: number
}

const Input: React.FunctionComponent<Props> = ({
  value,
  onChange,
  autoFocus,
  addon = null,
  length,
  placeholder,
}) => (
  <div
    className={styles.wrapper}
    style={
      length
        ? {
            width: 75 + 16 * length + 'px',
          }
        : null
    }
  >
    <input
      className={styles.inputElement}
      type="text"
      placeholder={placeholder}
      value={value}
      autoFocus={autoFocus}
      onInput={(event) => onChange(event.currentTarget.value)}
    />
    {addon}
  </div>
)

export default Input
