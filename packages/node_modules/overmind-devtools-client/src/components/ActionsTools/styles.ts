import { css } from 'emotion'

import { colors } from '../../theme'

export const wrapper = css({
  margin: '1rem',
  display: 'flex',
  alignItems: 'stretch',
})

export const button = css({
  borderLeft: 'none',
  backgroundColor: colors.green,
  color: colors.foreground,
  padding: '0.5rem 1rem',
  boxSizing: 'border-box',
  borderTopRightRadius: 3,
  borderBottomRightRadius: 3,
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  ':hover': {
    fontWeight: 'bold',
  },
})
