import { css } from 'emotion'
import { colors } from '../../theme'

export const listWrapper = css({
  padding: '0.3rem',
  height: 'calc(100% - 1rem)',
  overflowY: 'auto',
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

export const item = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '0.5rem 1rem',
  borderBottom: '1px solid #333',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: colors.foreground,
  },
  userSelect: 'none',
})

export const selectedItem = css({
  backgroundColor: colors.foreground,
})

export const indicator = css({
  display: 'inline-block',
  width: 10,
  height: 10,
  borderRadius: 2,
})

export const itemName = css({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  padding: '0 0.5rem',
})

export const itemCount = css({
  backgroundColor: colors.background,
  color: 'white',
  borderRadius: '3px',
  padding: '0.1rem 0.3rem',
  fontSize: '0.8rem',
  marginLeft: '0.5rem',
})
