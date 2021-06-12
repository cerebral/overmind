import { css } from 'emotion'

import { colors } from '../../theme'

export const runtimeWrapper = css({
  position: 'relative',
})
export const wrapper = css({
  backgroundColor: colors.foreground,
  width: 50,
  borderRight: `1px solid ${colors.border}`,
  boxShadow: '5px 0px 20px 5px rgba(0,0,0,0.10)',
})

export const actionsCount = css({
  position: 'absolute',
  bottom: '0.25rem',
  right: '0.25rem',
  borderRadius: '50%',
  width: 20,
  height: 20,
  backgroundColor: colors.background,
  color: colors.text,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 10,
  cursor: 'pointer',
})

export const button = css({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '0.25rem 0',
  color: colors.text,
  fontSize: 20,
  justifyContent: 'center',
  outline: 'none',
  border: 0,
  backgroundColor: 'transparent',
  width: 50,
  height: 50,
  opacity: 0.5,
  ':hover': {
    opacity: 0.75,
  },
})

export const buttonWithCount = css({
  button: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '0.25rem 0',
    color: colors.text,
    fontSize: 20,
    justifyContent: 'center',
    outline: 'none',
    border: 0,
    backgroundColor: 'transparent',
    width: 50,
    height: 50,
    opacity: 0.5,
  },
  ':hover button': {
    opacity: 0.75,
  },
})

export const activeButton = css({
  opacity: 1,
  ':hover': {
    opacity: 1,
  },
})

export const divider = css({
  borderBottom: `1px solid ${colors.background}`,
  margin: '0 5px',
})
