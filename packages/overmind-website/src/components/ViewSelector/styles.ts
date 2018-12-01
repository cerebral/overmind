import { css } from 'emotion'

export const wrapper = css`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 200px;
`

export const viewOption = css`
  display: flex;
  align-items: center;
`

export const tsImageWrapper = css`
  display: flex;
  padding: 4px;
  align-items: center;
  border-top-left-radius: var(--border-radius-1);
  border-bottom-left-radius: var(--border-radius-1);
`

export const image = css`
  border-radius: var(--border-radius-1);
  cursor: pointer;
  margin: var(--padding-2);
  box-shadow: none;
  opacity: 1;
`

export const grayscale = css`
  box-shadow: inset 0px 0px 20px 1px rgba(0, 0, 0, 0.5);
  opacity: 0.5;
`

export const selector = css`
  display: flex;
  flex: 1;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  cursor: pointer;
  padding: var(--padding-3);
  color: var(--color-black-2);
  font-size: var(--font-size-2);
  border-top-right-radius: var(--border-radius-1);
  border-bottom-right-radius: var(--border-radius-1);
  text-transform: lowercase;
  :hover {
    background-color: var(--color-gray-2);
  }
  > img {
    margin-right: 5px;
  }
`

export const selectorOpen = css`
  background-color: var(--color-gray-2);
`

export const chevron = css`
  margin-left: auto;
  font-size: var(--font-size-1);
`

export const dropdown = css`
  position: absolute;
  width: 100%;
  background-color: var(--color-gray-2);
  top: calc(100% - 1px)};
  border-bottom-left-radius: var(--border-radius-1);
  border-bottom-right-radius: var(--border-radius-1);
`

export const option = css`
  display: flex;
  align-items: center;
  padding: var(--padding-3);
  color: var(--color-black-2);
  font-size: var(--font-size-2);
  text-transform: lowercase;
  cursor: pointer;
  :hover {
    background-color: var(--color-gray-1);
  }
  :last-child {
    border-bottom-left-radius: var(--border-radius-1);
    border-bottom-right-radius: var(--border-radius-1);
  }
  img {
    margin-right: 5px;
  }
`
