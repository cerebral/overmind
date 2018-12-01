import { css } from 'emotion'

export const wrapper = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.25s ease-in;
  z-index: 3;
`

export const backdrop = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
`

export const video = css`
  position: relative;
  display: inline-block;
  width: 560px;
  height: 315px;
  @media (max-width: 1024px) {
    width: 300px;
    height: 169px;
  }
  box-shadow: 0px 0px 36px 0px rgba(0, 0, 0, 0.75);
  background-color: #000;
`

export const loader = css`
  position: absolute;
  width: 560px;
  top: 50%;
  @media (max-width: 1024px) {
    width: 300px;
  }
  text-align: center;
  color: var(--color-white-1);
`

export const iframe = css`
  position: absolute;
  top: 0;
  left: 0;
`
