import * as Color from 'color'
import { ThemeInterface } from './'

export default function createTheme(colors): ThemeInterface {
  return {
    color: {
      ...colors,
      fade: (color, fade) =>
        Color(color)
          .fade(fade)
          .string(),
      lighten: (color, lighten) =>
        Color(color)
          .lighten(lighten)
          .string(),
    },
    padding: {
      none: '0',
      smallest: '0.1rem',
      smallerer: '0.25rem',
      smaller: '0.5rem',
      small: '1rem',
      normal: '2rem',
      large: '3rem',
    },
    borderRadius: {
      normal: '3px',
      large: '6px',
    },
    fontSize: {
      smallest: '10px',
      small: '14px',
      normal: '16px',
      large: '20px',
      larger: '22px',
      largest: '34px',
    },
  }
}
