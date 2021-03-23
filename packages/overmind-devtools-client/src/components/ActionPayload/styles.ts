import { css } from 'emotion'
import { colors } from '../../theme'

export const wrapper = css({
  backgroundColor: colors.text,
  color: colors.foreground,
  boxSizing: 'border-box',
})

export const input = css({
  outline: 'none',
  padding: '0.5rem 1rem',
  border: '2px solid transparent',
  fontSize: 14,
  height: '100%',
  fontFamily: 'inherit',
  color: colors.foreground,
  backgroundColor: 'transparent',
  width: 200,
  boxSizing: 'border-box',
})
