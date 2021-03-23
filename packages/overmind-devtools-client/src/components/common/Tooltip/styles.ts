import { css } from 'emotion'
import { colors } from '../../../theme'

export const tooltipWrapper = css({
  position: 'relative',
  display: 'inline-block',
  ':hover > span': {
    display: 'flex',
  },
  zIndex: 9999999,
})

export const tooltipElement = css({
  position: 'absolute',
  left: 'calc(100% - 5px)',
  top: 0,
  boxSizing: 'border-box',
  height: '100%',
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
})

export const tooltipText = css({
  backgroundColor: colors.highlight,
  color: colors.background,
  borderRadius: 2,
  padding: '0.1rem 0.5rem',
  fontSize: 10,
  textTransform: 'uppercase',
})
