import { css } from 'emotion'

import { colors } from '../../theme'

export const wrapper = css({
  fontFamily: "'Source Code Pro', monospace",
  fontSize: 16,
  lineHeight: '24px',
  color: colors.highlight,
})

export const smallWrapper = css({
  fontFamily: "'Source Code Pro', monospace",
  fontSize: 12,
  lineHeight: '16px',
})

export const key = css({
  marginRight: 5,
  color: colors.text,
  cursor: 'pointer',
  ':hover': {
    opacity: 0.75,
  },
})

export const toolIcon = css({
  margin: '0 0.75rem',
})

export const inlineNested = css({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
})

export const bracket = (pointer: boolean) =>
  css({
    display: 'flex',
    alignItems: 'center',
    cursor: pointer ? 'pointer' : 'default',
  })

export const stringValue = css({
  display: 'flex',
  alignItems: 'center',
  color: colors.yellow,
})

export const otherValue = css({
  display: 'flex',
  alignItems: 'center',
  color: colors.purple,
})

export const inlineClass = css({
  color: colors.purple,
  marginRight: '0.5rem',
})

export const genericValue = css({
  display: 'flex',
  alignItems: 'center',
  color: colors.blue,
})

export const nestedChildren = css({
  paddingLeft: '1rem',
})

export const keyCount = css({
  fontsize: 14,
  color: colors.highlight,
})

export const editValueWrapper = css({
  position: 'relative',
})

export const editValuePopup = css({
  position: 'absolute',
  width: 400,
  height: 100,
  top: 0,
  left: 0,
  boxShadow: '0px 10px 13px 0px rgba(0,0,0,0.1)',
})

export const newState = css({
  fontFamily: 'inherit',
  fontSize: 16,
  border: '2px solid transparent',
  backgroundColor: colors.text,
  color: colors.foreground,
  outline: 'none',
  borderRadius: 3,
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
})

export const ok = css({
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  right: 0,
  fontSize: 10,
  border: 0,
  outline: 'none',
  padding: '0.25rem 0.5rem',
  opacity: 0.5,
  color: colors.background,
})
