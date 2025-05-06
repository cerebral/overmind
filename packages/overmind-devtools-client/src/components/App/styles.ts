import { css } from 'emotion'
import { colors } from '../../theme'

export const container = (zoomLevel: number) =>
  css({
    height: `calc(100vh / ${zoomLevel})`,
    width: `calc(100vw / ${zoomLevel})`,
    overflow: 'auto',
    transform: `scale(${zoomLevel})`,
    transformOrigin: 'top left',
    transition: 'transform 0.1s ease',
    scrollbarColor: `rgba(121, 121, 121, 0.4) ${colors.foreground}`,
    scrollbarWidth: 'thin',
    ':hover': {
      scrollbarColor: `rgba(100, 100, 100, 0.7) ${colors.foreground}`,
    },
  })
