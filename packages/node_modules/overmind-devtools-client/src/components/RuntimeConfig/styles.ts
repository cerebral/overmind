import { css } from 'emotion'
import { colors } from '../../theme'

export const wrapper = css({
  position: 'absolute',
  left: '100%',
  height: '100%',
  zIndex: 999999,
  top: 0,
})

export const overlay = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
})

export const contentWrapper = css({
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '1rem',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: colors.foreground,
  borderRadiusTopRight: 3,
  borderRadiusBottomRight: 3,
  boxShadow: '5px 5px 20px 5px rgba(0,0,0,0.10)',
})

export const newPort = css({
  border: 0,
  padding: '0.5rem',
  borderRadius: 3,
  outline: 'none',
  fontSize: 16,
  width: 75,
})

export const appHost = css({
  border: 0,
  padding: '0.5rem',
  borderRadius: 3,
  outline: 'none',
  fontSize: 16,
  width: 150,
})

export const configWrapper = css({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
})

export const configTitle = css({
  margin: 0,
  fontSize: 18,
  color: colors.blue,
})

export const configDescription = css({
  display: 'flex',
  width: '400px',
  flexDirection: 'column',
})

export const configValue = css({
  marginLeft: '1rem',
})

export const code = css({
  borderRadius: 3,
  padding: '10px',
  margin: 0,
  background: colors.foreground,
})
