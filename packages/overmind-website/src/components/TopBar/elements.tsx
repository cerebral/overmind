import styled from '../../styled-components'

export const Wrapper = styled.div`
  position: fixed;
  z-index: 2;
  background-color: ${({ theme }) => theme.color.white};
  height: 50px;
  top: -50px;
  transition: top 0.5s ease-out;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.01);
`

export const Link = styled<{ selected?: boolean }, 'a'>('a')`
  text-decoration: none;
  color: ${({ selected, theme }) =>
    selected ? theme.color.primary : theme.color.fade(theme.color.black, 0.5)};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  margin: ${({ theme }) => theme.padding.small};
  cursor: pointer;
  text-transform: uppercase;
  :hover {
    color: ${({ selected, theme }) =>
      selected ? theme.color.primary : theme.color.black};
  }
`
