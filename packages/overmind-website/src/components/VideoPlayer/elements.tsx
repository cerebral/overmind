import styled from '../../styled-components'

export const Wrapper = styled.div`
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
`

export const Backdrop = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
`

export const Video = styled.div`
  position: relative;
  display: inline-block;
  width: 560px;
  height: 315px;
  box-shadow: 0px 0px 36px 0px rgba(0, 0, 0, 0.75);
  background-color: #000;
`

export const Loader = styled.div`
  position: absolute;
  width: 560px;
  top: 50%;
  text-align: center;
  color: ${({ theme }) => theme.color.white};
`

export const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
`
