import { css } from 'emotion'

export const wrapper = css`
  display: flex;
  align-items: center;
`

export const listWrapper = css`
  position: fixed;
  top: 50px;
  height: calc(100% - 50px);
  overflow-y: scroll;
  z-index: 1;
  box-sizing: border-box;
  width: 175px;
  padding: 35px 0;
  right: calc(50% + 325px);
`

export const list = css`
  list-style-type: none;
  margin: 0;
  padding: 0;
  a {
    text-decoration: none;
    display: block;
    color: var(--color-black-1);
    :hover {
      color: var(--color-dark-1);
    }
  }
`

export const item = css`
  padding: var(--padding-2) var(--padding-3);
  color: var(--color-primary);
  border-left: 2px solid transparent;
`

export const itemSelected = css`
  border-left: 2px solid var(--color-primary);
`

export const tocList = css`
  padding: 0;
  list-style-type: none;
  padding-left: 0.8em;
  padding-top: var(--padding-1);
  font-size: 0.8em;
  margin: 0;
`

export const tocItem = css`
  padding: var(--padding-1);
`
