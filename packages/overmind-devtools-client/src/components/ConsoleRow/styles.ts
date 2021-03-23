import { css } from 'emotion'
import { colors } from '../../theme'

export const wrapper = css({
  display: 'flex',
  alignitems: 'center',
  padding: '0.5rem',
  backgroundColor: colors.background,
  borderBottom: `1px solid ${colors.border}`,
})

export const type = css({
  fontWeight: 'bold',
  fontFamily: "'Source Code Pro', monospace",
  marginRight: '0.25rem',
})
