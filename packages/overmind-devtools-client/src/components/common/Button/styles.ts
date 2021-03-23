import { css } from 'emotion'
import { colors } from '../../../theme'

export const button = css({
  border: 0,
  outline: 'none',
  textTransform: 'uppercase',
  padding: '0.25rem 0.5rem',
  borderRadius: 3,
  color: colors.text,
  backgroundcolor: colors.foreground,
  cursor: 'pointer',
  ':hover:enabled': {
    opacity: 0.9,
  },
  ':hover i': {
    display: 'block',
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'default',
  },
})
