import { css } from 'emotion'
import { colors } from '../../theme'

export const wrapper = css({
  flex: '0 0 250px',
  position: 'relative',
  borderTopLeftRadius: 3,
  borderBottomLeftRadius: 3,
  backgroundColor: colors.foreground,
  display: 'flex',
  padding: '0 1rem',
  alignItems: 'center',
  cursor: 'pointer',
  color: colors.text,
})

export const inputWrapper = css({
  position: 'relative',
  flex: 1,
  height: '100%',
  margin: 0,
  padding: 0,
})

export const input = css({
  position: 'absolute',
  border: 0,
  left: '-1rem',
  fontFamily: 'inherit',
  outline: 'none',
  backgroundColor: 'transparent',
  color: colors.text,
  height: '100%',
  boxSizing: 'border-box',
  fontSize: 16,
  width: '100%',
  padding: '0.5rem',
  '::placeholder': {
    color: 'rgba(255,255,255,0.25)',
  },
})

export const inputActive = css({
  paddingLeft: '1.5rem',
})

export const suggestion = css({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  boxSizing: 'border-box',
  left: '-1rem',
  fontSize: 16,
  padding: '0.5rem',
  opacity: 0.5,
})

export const indicator = css({
  display: 'inline-block',
  width: 10,
  height: 10,
  borderRadius: 2,
})

export const selectedAction = css({
  padding: '0 0.5rem',
})

export const noSelectedAction = css({
  opacity: 0.5,
})

export const resultWrapper = css({
  position: 'absolute',
  top: '100%',
  minWidth: '100%',
  maxHeight: '75vh',
  overflowY: 'scroll',
  left: 0,
  backgroundColor: colors.border,
  borderBottomLeftRadius: 3,
  borderBottomRightRadius: 3,
  zIndex: 2,
})

export const result = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  padding: '0.25rem 1rem',
  '> :first-child': {
    marginRight: '0.5rem',
  },
  ':hover': {
    backgroundColor: colors.foreground,
  },
})
