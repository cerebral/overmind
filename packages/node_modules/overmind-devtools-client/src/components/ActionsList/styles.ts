import { css } from 'emotion'

import { colors } from '../../theme'

export const separator = css({
  height: 3,
  backgroundColor: colors.foreground,
  margin: '2px 0',
})

export const wrapper = css({
  padding: '1rem',
  height: '100%',
  overflowY: 'scroll',
  boxSizing: 'border-box',
})

export const clearItems = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0 1rem 1rem 1rem',
  textDecoration: 'underline',
  cursor: 'pointer',
  opacity: 1,
  ':hover': {
    opacity: 0.9,
  },
})

export const actionItem = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  padding: '0.1rem',
  borderRadius: 3,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: colors.foreground,
  },
  marginBottom: 2,
})

export const selected = css({
  backgroundColor: colors.foreground,
  fontWeight: 'bold',
})

export const errorIndication = css({
  marginLeft: 'auto',
  backgroundColor: colors.red,
  borderRadius: 2,
  width: 10,
  height: 10,
  marginRight: 10,
})

export const actionColor = css({
  borderRadius: 2,
  flex: '0 0 10px',
  height: 10,
  marginLeft: 10,
  marginRight: 10,
})

export const actionSubItem = css({
  padding: '0.1rem',
  cursor: 'pointer',
  textIndent: 15,
  borderRadius: 3,
  ':hover': {
    backgroundColor: colors.foreground,
  },
  marginBottom: 2,
})
