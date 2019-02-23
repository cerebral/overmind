import { css } from 'emotion'

export const version = css`
  width: 150px;
  color: var(--color-black-1);
  a {
    text-decoration: none;
    color: var(--color-primary);
    font-weight: bold;
    font-size: 12px;
  }
`

export const wrapper = css`
  position: fixed;
  z-index: 2;
  background-color: var(--color-white-1);
  height: 50px;
  top: -50px;
  transition: top 0.5s ease-out;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.01);
`

export const link = css`
  text-decoration: none;
  color: var(--color-black-1);
  margin: var(--padding-4);
  border-bottom: 2px solid transparent;
  font-weight: normal;
  cursor: pointer;
  text-transform: uppercase;
  :hover {
    color: var(--color-black-2);
  }
`

export const selected = css`
  border-bottom: 2px solid var(--color-primary);
  font-weight: bold;
`
