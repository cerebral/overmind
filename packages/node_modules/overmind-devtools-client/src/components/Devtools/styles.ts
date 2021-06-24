import { css } from 'emotion'
import { colors } from '../../theme'

export const wrapper = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  backgroundColor: colors.background,
  color: colors.text,
  flexDirection: 'column',
})

export const container = css({
  position: 'relative',
  maxWidth: 500,
})

export const input = css({
  border: '1px solid transparent',
  padding: '1rem',
  fontSize: 16,
  width: 300,
  outline: 'none',
  borderRadius: 3,
})
