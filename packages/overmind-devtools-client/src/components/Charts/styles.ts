import { css } from 'emotion'

import { colors } from '../../theme'

export const wrapper = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
})

export const listWrapper = css({
  padding: '1rem',
})

export const centerWrapper = css({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
})

export const columns = css({
  display: 'flex',
  '> *:first-child': {
    flex: '0 0 300px',
  },
  '> *:last-child': {
    flex: 1,
  },
  flex: 1,
  position: 'relative',
})

export const chartItem = css({
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

export const chartColor = css({
  borderRadius: 2,
  flex: '0 0 10px',
  height: 10,
  marginLeft: 10,
  marginRight: 10,
})
