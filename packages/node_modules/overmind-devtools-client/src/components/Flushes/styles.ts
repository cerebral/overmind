import { css } from 'emotion'
import { colors } from '../../theme'

export const wrapper = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem 1rem',
  height: '100vh',
  boxSizing: 'border-box',
  overflowY: 'scroll',
})

export const panels = css({
  display: 'flex',
  justifyContent: 'space-around',
  marginBottom: '2rem',
})

export const panel = css({
  padding: '0.25rem',
  '> span': {
    margin: '0 0.25rem',
  },
})

export const flushWrapper = css({
  margin: '0.5rem 1rem',
})

export const flushHeader = css({
  display: 'flex',
})

export const flushTitle = css({
  flex: 0,
  padding: '0 0.5rem',
  backgroundColor: colors.highlight,
  color: colors.foreground,
  borderTopLeftRadius: 3,
  borderBottomLeftRadius: 3,
})

export const flushDetails = css({
  flex: 1,
  backgroundColor: colors.foreground,
  borderTopRightRadius: 3,
  borderBottomRightRadius: 3,
})

export const flushBody = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '0.5rem',
})

export const mutation = css({
  display: 'flex',
  alignItems: 'center',
  '> *': {
    marginRight: '1rem',
  },
})
