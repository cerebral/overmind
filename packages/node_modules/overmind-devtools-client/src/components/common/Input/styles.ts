import { css } from 'emotion'
import { colors } from '../../../theme'

export const wrapper = css({
  display: 'flex',
  backgroundColor: colors.text,
  borderRadius: 6,
  padding: '0.5rem',
})

export const inputElement = css({
  border: 0,
  padding: 0,
  margin: 0,
  color: colors.background,
  backgroundColor: 'transparent',
  outline: 'none',
  fontSize: 20,
  width: '100%',
})
