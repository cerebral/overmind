import { css } from 'emotion'

export const wrapper = css`
  position: relative;
`

export const inputElement = css`
  border: 0;
  outline: 0;
  border-radius: var(--border-radius-1);
  color: var(--color-black-1);
  background-color: var(--color-white-1);
  padding: var(--padding-2);
  margin: 0 var(--padding-3);
`

export const searchResult = css`
  position: absolute;
  top: 35px;
  right: 0;
  width: 300px;
  background-color: var(--color-white-1);
  border-radius: var(--border-radius-1);
  margin: 0 var(--padding-3);
  box-shadow: 0px 10px 11px -6px rgba(0, 0, 0, 0.28);
`

export const searchResultItem = css`
  padding: var(--padding-3);
  color: var(--color-black-1);
  display: flex;
  align-items: center;
  text-decoration: none;
  :hover {
    background-color: var(--color-white-2);
  }
  > span {
    background-color: var(--color-primary);
    color: var(--color-white-1);
    font-size: var(--font-size-1);
    margin-right: var(--padding-3);
    padding: var(--padding-1) var(--padding-2);
    border-radius: var(--border-radius-1);
    font-weight: bold;
  }
`

export const searchText = css`
  font-size: var(--font-size-2);
  padding: var(--padding-3);
`
