import { css } from 'emotion'
import { colors } from '../theme'

export const white = css({
  color: colors.text,
})

export const red = css({
  color: colors.red,
})

export const purple = css({
  color: colors.purple,
})

export const yellow = css({
  color: colors.yellow,
})

export const dark = css({
  color: colors.background,
})
export const monospace = css({
  fontFamily: "'Source Code Pro', monospace",
  lineHeight: '16px',
})

export const header = css({
  fontSize: 34,
  textTransform: 'none',
  fontWeight: 'bold',
  padding: '2rem 0',
})

export const denseHeader = css(header, {
  padding: '0.5rem 0',
})

export const title = css({
  fontSize: 20,
  textTransform: 'none',
  fontWeight: 'bold',
  padding: '1rem 0',
})

export const denseTitle = css(title, {
  padding: '0.25rem 0',
})

export const label = css({
  fontSize: 16,
  textTransform: 'uppercase',
  fontWeight: 'normal',
  padding: '0.5rem 0',
})

export const denseLabel = css(label, {
  padding: '0.25rem 0',
})

export const normal = css({
  fontSize: 16,
  textTransform: 'none',
  fontWeight: 'normal',
  padding: '0.5rem 0',
})

export const denseNormal = css(normal, {
  padding: '0.25rem 0',
})

export const description = css({
  fontSize: 14,
  textTransform: 'none',
  fontWeight: 'normal',
  padding: 0,
})

export const hint = css({
  fontSize: 10,
  textTransform: 'none',
  fontWeight: 'normal',
  padding: 0,
})
