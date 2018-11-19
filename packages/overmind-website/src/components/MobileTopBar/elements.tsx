import styled from '../../styled-components'

export const Wrapper = styled.div`
  position: fixed;
  z-index: 2;
  height: 50px;
  top: -50px;
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.black};
  transition: top 0.5s ease-out;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: ${({ theme }) => `0 ${theme.padding.small}`};
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.01);
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
  -webkit-overflow-scrolling: touch;
  border-right: 2px solid ${({ theme }) => theme.color.primary};
  padding: ${({ theme }) => theme.padding.small};
  padding-bottom: ${({ theme }) => theme.padding.large};
  box-sizing: border-box;
`

export const Link = styled<{ selected?: boolean }, 'a'>('a')`
  text-decoration: none;
  color: ${({ selected, theme }) =>
    selected ? theme.color.primary : theme.color.black};
  margin: ${({ theme }) => theme.padding.small};
  cursor: pointer;
  text-transform: uppercase;
`
