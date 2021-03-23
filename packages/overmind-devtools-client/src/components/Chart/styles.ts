import { css } from 'emotion'

import { colors } from '../../theme'

export const outerWrapper = css({
  overflowY: 'scroll',
  boxSizing: 'border-box',
  margin: '1rem',
  height: '100%',
  border: '1px solid ' + colors.foreground,
  borderRadius: 3,
})

export const wrapper = css({
  position: 'relative',
  display: 'table',
  margin: '1rem',
  borderSpacing: '0 0.25rem',
})

export const id = css({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '0.25rem 0.5rem',
  backgroundColor: colors.foreground,
  borderRadius: 3,
  margin: '0 0 0.25rem 0',
  svg: {
    width: 10,
    marginRight: '0.5rem',
  },
})

export const stateItem = css({
  display: 'table-row',
})

export const stateNameCell = css({
  display: 'table-cell',
  padding: '0.5rem 0 ',
})

export const stateLineCell = css({
  position: 'relative',
  display: 'table-cell',
  width: '1rem',
})

export const transitionCell = css({
  display: 'table-cell',
  verticalAlign: 'center',
  fontSize: 12,
  paddingLeft: '0.25rem',
})

export const stateName = css({
  borderRadius: 3,
  padding: '0.5rem',
  boxSizing: 'border-box',
  width: '100%',
  textAlign: 'center',
  backgroundColor: colors.foreground,
})

export const stateAction = css({
  borderRadius: 3,
  border: '2px solid ' + colors.foreground,
  padding: '0.5rem',
  boxSizing: 'border-box',
  width: '100%',
  textAlign: 'center',
})

export const selectedLine = css({
  position: 'absolute',
  height: 2,
  backgroundColor: colors.foreground,
  width: '100%',
  top: '2rem',
})

export const transitionLine = css({
  position: 'absolute',
  height: 2,
  backgroundColor: colors.foreground,
  width: '100%',
  top: '1.25rem',
})

export const entryCell = css({
  position: 'relative',
  display: 'table-cell',
  width: '1rem',
})

export const onName = css({
  borderRadius: 3,
  border: '1px solid transparent',
  padding: '0.5rem',
  margin: '0.25rem 0',
  boxSizing: 'border-box',
  textAlign: 'center',
  backgroundColor: colors.foreground,
  opacity: 0.5,
})

export const activeAction = css({
  opacity: 1,
  cursor: 'pointer',
  ':hover': {
    opacity: 0.9,
  },
})

export const onCell = css({
  display: 'table-cell',
  padding: '0.5rem ',
  border: '2px solid ' + colors.foreground,
  borderRadius: 3,
})

export const selectedAction = css({
  border: '1px dashed ' + colors.highlight,
})

export const nestedRoomCell = css({
  display: 'table-cell',
})

export const nestedChart = css({
  width: '100%',
})
