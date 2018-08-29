import styled from '../../styled-components'

export const Wrapper = styled.div`
  position: fixed;
  z-index: 2;
  background-color: ${({ theme }) =>
    theme.color.lighten(theme.color.dark, -0.25)};
  height: 50px;
  top: -50px;
  color: ${({ theme }) => theme.color.white};
  transition: top 0.5s ease-out;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: ${({ theme }) => `0 ${theme.padding.small}`};
`

export const MenuWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  transform: translate3d(-110vw, 0, 0);
  transition: transform 0.2s ease-in-out;
  width: 100vw;
  height: 100vh;
`

export const Menu = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 10px 0px 41px 6px rgba(0, 0, 0, 0.35);
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  border-right: 2px solid ${({ theme }) => theme.color.primary};
`

export const Link = styled<{ selected?: boolean }, 'a'>('a')`
  text-decoration: none;
  color: ${({ selected, theme }) =>
    selected ? theme.color.primary : theme.color.black};
  margin: ${({ theme }) => theme.padding.small};
  cursor: pointer;
  text-transform: uppercase;
  :hover {
    color: ${({ theme }) => theme.color.white};
  }
`
