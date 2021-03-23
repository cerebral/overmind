import { css } from 'emotion'
import { colors } from '../../theme'

export const wrapper = css({
  padding: '1rem',
  height: '100%',
  overflowY: 'scroll',
  boxSizing: 'border-box',
})

export const innerWrapper = css({
  margin: '0.5rem 0',
  padding: 0,
  border: `1px solid ${colors.blue}`,
})

export const innerTitle = css({
  color: colors.blue,
  padding: '0.1rem 0.5rem',
})

export const innerContent = css({
  padding: '0.5rem',
})

export const pipe = css({
  display: 'flex',
  alignItems: 'center',
})

export const breakStyle = css({
  display: 'flex',
  alignItems: 'center',
  borderRadius: 3,
  color: colors.foreground,
  backgroundColor: colors.purple,
  padding: '0 0.5rem',
  marginBottom: '1rem',
})

export const operatorChildren = css({
  display: 'flex',
  paddingBottom: '1rem',
  '> div:last-child': {
    paddingBottom: 0,
  },
})

export const path = css({
  writingMode: 'vertical-rl',
  display: 'flex',
  textOrientation: 'upright',
  fontSize: 10,
  lineHeight: '14px',
  padding: '0.25rem 0',
  backgroundColor: colors.highlight,
  borderRadius: 3,
  color: colors.foreground,
  marginRight: '0.5rem',
  fontWeight: 'bold',
  justifyContent: 'center',
})

export const pathOperators = css({
  paddingBottom: '1rem',
  flex: 1,
  '> :last-child': {
    paddingBottom: 0,
  },
})
