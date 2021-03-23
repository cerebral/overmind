import { css } from 'emotion'

import { colors } from '../../theme'

export const wrapper = css({
  padding: '2rem',
  height: '100vh',
  boxSizing: 'border-box',
  overflowY: 'scroll',
  fontSize: 14,
})

export const label = css({
  padding: '0 0.5rem',
  color: colors.blue,
  opacity: 0.25,
  display: 'flex',
  alignItems: 'center',
})

export const addComponent = css({
  color: colors.green,
  padding: '0 0.5rem',
})

export const updateComponent = css({
  color: colors.highlight,
  padding: '0 0.5rem',
})

export const removeComponent = css({
  color: colors.red,
  padding: '0 0.5rem',
})

export const recordWrapper = css({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.25rem',
})

export const mutationType = css({
  padding: '0 0.5rem',
  color: colors.yellow,
})

export const effectPath = css({
  padding: '0 0.5rem',
  color: colors.purple,
})

export const mutationPath = css({
  padding: '0 0.5rem',
  color: colors.text,
})

export const arg = css({
  padding: '0 0.5rem',
})

export const flushDetail = css({
  position: 'relative',
  display: 'flex',
  margin: '0 0.5rem',
  fontSize: 12,
  alignItems: 'center',
  color: colors.text,
  cursor: 'default',
  '> svg': {
    marginLeft: '0.25rem',
  },
  ':hover > div': {
    display: 'block',
  },
})
export const actionName = css({
  padding: '0 0.5rem',
})

export const flushPopup = css({
  position: 'absolute',
  boxShadow: '0px 10px 13px 0px rgba(0,0,0,0.1)',
  display: 'none',
  width: 300,
  zIndex: 2,
  borderRadius: 3,
  fontSize: 14,
  top: '100%',
  left: 0,
  backgroundColor: colors.foreground,
  color: colors.text,
  padding: '0.5rem',
})
