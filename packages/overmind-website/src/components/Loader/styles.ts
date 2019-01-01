import { css } from 'emotion'

export const wrapper = css`
  position: fixed;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  color: var(--color-dark-1);
  top: calc(50vh - 100px);
`

export const circle = css`
  position: absolute;
  background-color: #eaeaea;
  border-radius: 50%;
  width: 125px;
  height: 125px;
  box-shadow: 0 0 0 rgba(206, 206, 206, 0.4);
  animation: pulse 2s infinite 0.5s;
`

export const innerCircle = css`
  position: absolute;
  background-color: var(--color-white-1);
  border-radius: 50%;
  width: 100px;
  height: 100px;
`

export const block = css`
  position: absolute;
  background-color: var(--color-white-1);
  height: 25px;
  width: 125px;
`

export const text = css`
  position: absolute;
  color: #eaeaea;
  text-transform: uppercase;
  letter-spacing: 10px;
  text-indent: 10px;
`
