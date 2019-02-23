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
  width: 100%;
  small {
    margin-left: auto;
    margin-right: 0.5rem;
    color: #cacaca;
  }
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
  margin-left: 5px;
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

export const viewHelpWrapper = css`
  position: absolute;
  top: calc(100% + 10px);
  width: 300px;
  right: 0;
`

export const viewHelpArrow = css`
  position: relative;
  border-radius: 5px;
  background-color: var(--color-dark-1);
  box-shadow: 0px 3px 20px -10px rgba(0, 0, 0, 0.75);
  :after {
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(136, 183, 213, 0);
    border-bottom-color: var(--color-dark-1);
    border-width: 10px;
    margin-left: -10px;
  }
`

export const viewHelpText = css`
  font-size: var(--font-size-3);
  color: var(--color-white-1);
  padding: var(--padding-4);
`

export const viewHelpButton = css`
  padding: var(--padding-3) 0;
  cursor: pointer;
  text-align: center;
  color: var(--color-dark-1);
  background-color: var(--color-white-2);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-weight: bold;
`
