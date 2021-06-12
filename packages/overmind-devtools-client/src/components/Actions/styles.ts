import { css } from 'emotion'

export const wrapper = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
})

export const centerWrapper = css({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
})

export const columns = css({
  display: 'flex',
  '> *:first-child': {
    flex: '0 0 300px',
  },
  '> *:last-child': {
    flex: 1,
  },
  flex: 1,
  position: 'relative',
})
