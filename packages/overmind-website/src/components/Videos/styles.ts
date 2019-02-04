import { css } from 'emotion'

export const wrapper = css`
  display: flex;
  max-width: 800px;
  padding: var(--padding-5);
  flex-wrap: wrap;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
`

export const video = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  text-decoration: none;
  padding: var(--padding-4);
  margin: var(--padding-3);
  color: var(--color-black-1);
  font-size: var(--font-size-4);
  cursor: pointer;
  width: 200px;
  height: 125px;
  border-bottom: 2px solid var(--color-primary);
  transition: box-shadow 0.1s ease-out;
  box-shadow: 0px 0px 20px -10px rgba(0, 0, 0, 0.75);
  :hover {
    box-shadow: 0px 0px 20px -7px rgba(0, 0, 0, 0.75);
  }
  span {
    position: absolute;
    bottom: var(--padding-2);
    right: var(--padding-2);
    font-size: var(--font-size-1);
    color: var(--color-black-2);
  }
`
