import styled from '../../styled-components'

export const Wrapper = styled.div`
  background-color: inherit;
`
export const QuickstartWrapper = styled.div`
  height: 75px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  display: flex;
  bottom: -75px;
  transition: bottom 0.5s ease-out;
`

export const Quickstart = styled.a`
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.color.dark};
  background-color: ${({ theme }) =>
    theme.color.lighten(theme.color.dark, -0.5)};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  flex: 1;
  > *:nth-child(2) {
    margin-left: 15px;
  }
  color: ${({ theme }) => theme.color.fade(theme.color.white, 0.25)};
  :hover {
    color: ${({ theme }) => theme.color.white};
  }
`

export const IframeWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => '4rem'};
  justify-content: center;
  align-items: center;
`

export const Iframe = styled.iframe`
  border: 0;
  width: calc(100% - 200px);
  height: calc(100% - 200px);
  box-shadow: 0px 0px 20px -10px rgba(0, 0, 0, 0.75);
  border-radius: 4px;
  overflow: hidden;
`
