import { css } from 'emotion'
import { colors } from '../../theme'

export const wrapper = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
  height: '100%',
})

export const content = css({
  flex: 1,
  display: 'flex',
  alignItems: 'stretch',
})

export const pageContainer = css({
  flex: 1,
})

export const waitWrapper = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  backgroundColor: colors.background,
  color: colors.text,
  flexDirection: 'column',
})
