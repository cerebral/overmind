import styled from '../../styled-components'

export const Wrapper = styled.div`
  position: fixed;
  z-index: 2;
  background-color: ${({ theme }) =>
    theme.color.lighten(theme.color.dark, -0.25)};
  height: 50px;
  top: -50px;
  transition: top 0.5s ease-out;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Link = styled<{ selected?: boolean }, 'a'>('a')`
  text-decoration: none;
  color: ${({ selected, theme }) =>
    selected ? theme.color.white : theme.color.fade(theme.color.white, 0.5)};
  margin: ${({ theme }) => theme.padding.small};
  cursor: pointer;
  text-transform: uppercase;
  :hover {
    color: ${({ theme }) => theme.color.white};
  }
`
