import { css } from 'emotion'

export const wrapper = css({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
})

export const columns = css({
  flex: '1',
  display: 'flex',
})

export const centerWrapper = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
})
