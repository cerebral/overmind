import { css, keyframes } from 'emotion'
import { colors } from '../../theme'

export const operator = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  cursor: 'default',
})

export const effectArgs = css({
  display: 'flex',
  alignItems: 'center',
  '> span': {
    marginRight: '0.5rem',
  },
})

export const value = css({
  marginLeft: 'auto',
  marginRight: '0.5rem',
  display: 'flex',
  alignItems: 'center',
})

export const operatorType = css({
  color: colors.background,
  backgroundColor: colors.highlight,
  padding: '0 0.5rem',
  borderTopLeftRadius: 3,
  borderBottomLeftRadius: 3,
  fontSize: 14,
})

export const operatorName = css({
  marginLeft: '0.5rem',
})

export const notVisible = css({
  visibility: 'hidden',
})

export const operatorHeader = css({
  display: 'flex',
  backgroundColor: colors.border,
  borderRadius: 3,
  alignItems: 'stretch',
})

export const operatorBody = css({
  padding: '0.5rem',
})

export const operatorItem = css({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.5rem',
  '> *': {
    marginRight: 10,
  },
})

export const effectError = css({
  backgroundColor: colors.red,
  color: colors.text,
  padding: '0.1rem 0.5rem',
  fontsize: 14,
  borderRadius: 2,
})

const pulse = keyframes({
  from: {
    opacity: 0.5,
  },
  to: {
    opacity: 1,
  },
})

export const pendingOperatorItem = css({
  animation: `${pulse} 1s ease-out infinite`,
  animationDirection: 'alternate',
})
