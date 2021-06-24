import { css } from 'emotion'
import { colors } from '../../theme'

export const wrapper = css({
  position: 'relative',
  display: 'flex',
  marginTop: '0.5rem',
  backgroundColor: colors.foreground,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 99999,
})

export const app = css({
  outline: 'none',
  border: 0,
  width: '100%',
  cursor: 'pointer',
  backgroundColor: colors.foreground,
  borderRadiusTopRight: 3,
  borderRadiusBottomRight: 3,
  boxShadow: '5px 5px 20px 5px rgba(0,0,0,0.10)',
  display: 'flex',
  alignItems: 'center',
  color: colors.text,
  padding: '0.5rem 1rem',
  whiteSpace: 'nowrap',
})

export const appSelected = css({
  fontWeight: 'bold',
  color: colors.text,
})

export const currentApp = (color: string) =>
  css({
    border: `2px solid ${color}`,
    borderRadius: '50%',
    color: colors.background,
    backgroundColor: colors.text,
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 'bold',
  })

export const overlay = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
})

export const appsList = css({
  position: 'absolute',
  left: '100%',
  top: 0,
  color: colors.text,
  borderRight: `1px solid ${colors.background}`,
  borderBottom: `1px solid ${colors.background}`,
})
