import { css } from 'emotion'

import { colors } from '../../theme'

export const wrapper = css({
  position: 'relative',
  padding: '2rem',
  height: '100vh',
  boxSizing: 'border-box',
  overflowY: 'scroll',
})

export const edit = css({
  position: 'absolute',
  right: '1rem',
  top: '1rem',
  color: colors.highlight,
  fontSize: 12,
})

export const label = css({
  display: 'flex',
})

export const labelWrapper = css({
  display: 'flex',
  alignItems: 'center',
})

export const derivedLabel = css({
  marginRight: 5,
  backgroundColor: colors.highlight,
  padding: '0 0.25rem',
  borderRadius: 3,
  color: colors.background,
  display: 'flex',
  alignItems: 'center',
})
