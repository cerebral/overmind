import { css } from 'emotion'

export const wrapper = css`
  position: relative;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  color: var(--color-dark-1);
`

export const circle = css`
  position: absolute;
  background-color: var(--color-dark-1);
  border-radius: 50%;
  width: 125px;
  height: 125px;
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
  text-transform: uppercase;
  letter-spacing: 10px;
  text-indent: 10px;
`
