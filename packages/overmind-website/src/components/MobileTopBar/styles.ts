import { css } from 'emotion'

export const wrapper = css`
  position: fixed;
  z-index: 2;
  height: 50px;
  top: -50px;
  background-color: var(--color-white-1);
  color: var(--color-black-1);
  transition: top 0.5s ease-out;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 var(--padding-3);
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.01);
`

export const menuWrapper = css`
  position: fixed;
  left: 0;
  top: 0;
  transform: translate3d(-110vw, 0, 0);
  transition: transform 0.2s ease-in-out;
  width: 100vw;
  height: 100vh;
`

export const menu = css`
  background-color: var(--color-white-1);
  box-shadow: 10px 0px 41px 6px rgba(0, 0, 0, 0.35);
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  border-right: 2px solid var(--color-primary);
  padding: var(--padding-3);
  padding-bottom: var(--padding-5);
  box-sizing: border-box;
`

export const link = css`
  text-decoration: none;
  color: var(--color-black-1);
  margin: var(--padding-3);
  cursor: pointer;
  text-transform: uppercase;
`

export const apiLink = css`
  text-decoration: none;
  color: var(--color-black-1);
  margin: var(--padding-3);
  cursor: pointer;
`

export const linkSelected = css`
  color: var(--color-primary);
`
