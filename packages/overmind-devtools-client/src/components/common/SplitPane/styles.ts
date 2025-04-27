import { css, injectGlobal } from 'emotion'
import { colors } from '../../../theme'

injectGlobal`
  body.splitpane-dragging {
    user-select: none;
  }
`

export const container = (split: 'vertical' | 'horizontal') =>
  css({
    display: 'flex',
    flexDirection: split === 'vertical' ? 'row' : 'column',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    '&.dragging': {
      cursor: split === 'vertical' ? 'col-resize' : 'row-resize',
      userSelect: 'none',
    },
  })

export const paneFirst = (size: number) =>
  css({
    flex: `0 0 ${size}px`,
    position: 'relative',
    width: `${size}px`,
    overflow: 'hidden',
  })

export const paneSecond = css({
  flex: 1,
  position: 'relative',
})

export const divider = (
  split: 'vertical' | 'horizontal',
  isDragging: boolean
) =>
  css({
    flex: isDragging ? '0 0 3px' : '0 0 1px',
    backgroundColor: isDragging ? '#175ede' : colors.border || '#8c8c8c',
    cursor: split === 'vertical' ? 'col-resize' : 'row-resize',
    userSelect: 'none',
    position: 'relative',
    transition: 'background-color 0.1s, flex 0.1s',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      // Invisible overlay to make the divider easier to grab
      width: split === 'vertical' ? '5px' : '100%',
      height: split === 'vertical' ? '100%' : '5px',
      transform: split === 'vertical' ? 'translateX(-2px)' : 'translateY(-2px)',
      zIndex: 1,
    },
    '&:hover': {
      backgroundColor: '#175ede',
    },
  })

export const paneBase = css({
  overflow: 'hidden',
  width: '100%',
  height: 'calc(100vh - 6rem)',
  '& *': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  },
})
