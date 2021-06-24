import { css } from 'emotion'
import { colors } from '../../theme'

export const flush = css({
  cursor: 'pointer',
  backgroundColor: colors.yellow,
  borderTopRightRadius: 3,
  borderBottomRightRadius: 3,
  position: 'relative',
  marginLeft: '0.5rem',
  ':hover div:nth-child(2)': {
    display: 'block',
    zIndex: 2,
  },
  ':hover': {
    borderBottomRightRadius: 0,
  },
})

export const flushHeader = css({
  display: 'flex',
  alignItems: 'center',
  color: colors.foreground,
  padding: '0 0.5rem',
  fontSize: 12,
  fontWeight: 'bold',
  '> span': {
    display: 'flex',
    alignItems: 'center',
  },
  '> span svg': {
    marginLeft: 3,
  },
  '> span:last-child': {
    marginLeft: '0.5rem',
  },
})

export const flushBody = css({
  position: 'absolute',
  top: '100%',
  right: 0,
  padding: '0.5rem 1rem',
  backgroundColor: colors.foreground,
  borderBottomRightRadius: 3,
  display: 'none',
  flexWrap: 'wrap',
  boxShadow: '0px 10px 13px 0px rgba(0,0,0,0.1)',
  '> *:not(:last-child)': {
    marginRight: 15,
  },
})

export const flushItem = css({
  display: 'flex',
  alignItems: 'center',
  '> :first-child': {
    marginRight: 3,
  },
})

export const icon = css({
  opacity: 0.75,
  display: 'flex',
  alignItems: 'center',
})
