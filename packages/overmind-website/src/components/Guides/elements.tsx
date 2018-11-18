import styled from '../../styled-components'

export const Wrapper = styled.div`
  display: flex;
  max-width: 800px;
  padding: ${({ theme }) => theme.padding.large};
  flex-wrap: wrap;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
`

export const Guide = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  text-decoration: none;
  padding: ${({ theme }) => theme.padding.small};
  margin: ${({ theme }) => theme.padding.small};
  color: ${({ theme }) => theme.color.black};
  font-size: ${({ theme }) => theme.fontSize.large};
  cursor: pointer;
  width: 200px;
  height: 125px;
  border-bottom: 2px solid ${({ theme }) => theme.color.primary};
  transition: box-shadow 0.1s ease-out;
  box-shadow: 0px 0px 20px -10px rgba(0, 0, 0, 0.75);
  :hover {
    box-shadow: 0px 0px 20px -7px rgba(0, 0, 0, 0.75);
  }
  span {
    position: absolute;
    bottom: ${({ theme }) => theme.padding.smaller};
    right: ${({ theme }) => theme.padding.smaller};
    font-size: ${({ theme }) => theme.fontSize.smallest};
    color: ${({ theme }) => theme.color.fade(theme.color.black, 0.5)};
  }
`
