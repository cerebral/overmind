import styled from '../../styled-components'

export const Wrapper = styled.div`
  background-color: inherit;
  padding-top: 100px;
  display: flex;
  box-sizing: border-box;
  height: 100vh;
  justify-content: center;

  h1,
  h2 {
    color: ${({ theme }) => theme.color.dark};
  }
`

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1100px;
  width: 100%;
`

export const ValueProposition = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  width: 100%;
  padding: ${({ isMobile, theme }) =>
    isMobile ? `0 ${theme.padding.normal}` : '0'};
  box-sizing: border-box;
  align-items: center;
  > div {
    flex: 1;
    width: ${({ isMobile }) => (isMobile ? '100%' : 'auto')};
  }
  > div:nth-child(1) {
    margin-right: ${({ isMobile }) => (isMobile ? '0' : '40px')};
  }
  margin-bottom: ${({ isMobile }) => (isMobile ? '25px' : '100px')};
`

export const IframeWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const Iframe = styled.iframe`
  border: 0;
  width: 100%;
  height: 500px;
  box-shadow: 0px 0px 20px -10px rgba(0, 0, 0, 0.75);
  border-radius: 4px;
  overflow: hidden;
`

export const Banner = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({ isMobile }) => (isMobile ? '50px' : '150px')};
  > h1 {
    font-weight: normal;
    letter-spacing: 0.2rem;
    text-align: center;
    font-size: 28px;
  }
`

export const Button = styled.div``
