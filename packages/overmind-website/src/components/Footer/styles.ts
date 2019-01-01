import { css } from 'emotion'

export const wrapper = css`
  display: flex;
  background-color: var(--color-dark-1);
  height: 100px;
  justify-content: center;
  align-items: center;
  > * {
    margin: 0 var(--padding-4);
  }
`

export const copy = css`
  font-size: var(--font-size-3);
  color: var(--color-white-1);
  text-align: center;
  a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: bold;
  }
  div {
    font-size: var(--font-size-2);
  }
`

export const github = css`
  font-size: var(--font-size-6);
  color: var(--color-white-1);
  text-decoration: none;
`

export const chat = css`
  font-size: var(--font-size-6);
  color: var(--color-white-1);
  text-decoration: none;
`
