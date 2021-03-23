import { css } from 'emotion'
import { colors } from '../../theme'

export const wrapper = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  height: '100%',
  boxSizing: 'border-box',
  overflowY: 'scroll',
  maxHeight: '100vh',
})

export const panels = css({
  display: 'flex',
  justifyContent: 'space-around',
})

export const panel = css({
  padding: '0.25rem',
  '> span': {
    margin: '0 0.25rem',
  },
})

export const statsContainer = css({
  marginBottom: '2rem',
})

export const component = css({
  display: 'flex',
  alignItems: 'stretch',
  marginBottom: '0.5rem',
  cursor: 'pointer',
})

export const componentName = css({
  flex: 0,
  borderTopLeftRadius: 3,
  borderBottomLeftRadius: 3,
  backgroundColor: colors.highlight,
  color: colors.foreground,
  padding: '0 0.5rem',
})

export const componentPaths = css({
  flex: 1,
  backgroundColor: colors.foreground,
  borderTopRightRadius: 3,
  borderBottomRightRadius: 3,
  display: 'flex',
  alignItems: 'center',
  padding: '0 0.5rem',
})

export const componentPathsCount = css({
  padding: '0 0.5rem',
  color: colors.foreground,
})

export const faded = css({
  opacity: 0.75,
})

export const componentPathsBody = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
})

export const componentPathsHeader = css({
  display: 'flex',
  justifyContent: 'flex-end',
  height: '1rem',
})

export const separator = css({
  opacity: 0.25,
  padding: '0 3px',
})

export const componentPathsItems = css({
  display: 'flex',
  flexWrap: 'wrap',
})
