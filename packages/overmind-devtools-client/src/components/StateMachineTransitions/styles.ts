import { css } from 'emotion'
import { colors } from '../../theme'

export const transitionDetails = css({
  padding: '1rem',
  overflowY: 'auto',
  height: 'calc(100% - 2rem)',
})

export const stateTransition = css({
  padding: '0.25rem',
})

export const transition = css({
  fontFamily: "'Source Code Pro', monospace",
  fontSize: '16px',
  color: colors.highlight,
})

export const fromState = css({
  display: 'inline-block',
  marginRight: '0.5rem',
})

export const toState = css({
  display: 'inline-block',
})

export const eventType = css({
  display: 'inline-block',
  color: colors.blue,
  marginRight: '0.5rem',
})

export const arrow = css({
  margin: '0.2rem 0.35rem 0.2rem 0',
  height: '0.8rem',
})

export const colon = css({
  display: 'inline-block',
  marginRight: '0.4rem',
  fontSize: '18px',
  fontWeight: 'bold',
})

export const payload = css({
  padding: '0.5rem',
  backgroundColor: '#333',
  borderRadius: '3px',
  overflow: 'auto',
})
