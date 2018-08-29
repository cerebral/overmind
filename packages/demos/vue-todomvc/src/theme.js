import Color from 'color'

export default {
  color: {
    fade: (color, fade) =>
      Color(color)
        .fade(fade)
        .string(),
    lighten: (color, lighten) =>
      Color(color)
        .lighten(lighten)
        .string(),
    primary: '#C7402D',
    secondary: '#15959F',
    dark: '#133046',
    white: '#FAFAFA',
    gray: '#EAEAEA',
    black: '#333',
  },
  padding: {
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
    normal: '16px',
    large: '20px',
    larger: '22px',
    largest: '34px',
  },
}
