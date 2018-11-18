import styled from '../../styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

export const ListWrapper = styled.div`
  position: fixed;
  top: 35px;
  z-index: 1;
  box-sizing: border-box;
  width: 150px;

  padding-top: 50px;
  height: 100vh;
  right: calc(50% + 350px);
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`

export const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  a {
    text-decoration: none;
    display: block;
    color: ${({ theme }) => theme.color.black};
    :hover {
      color: ${({ theme }) => theme.color.dark};
    }
  }
`

export const Item = styled<
  {
    selected: boolean
  },
  'li'
>('li')`
  padding: ${({ theme }) => `${theme.padding.smaller} ${theme.padding.small}`};
  color: ${({ theme }) => theme.color.primary};
  border-left: 2px solid
    ${({ theme, selected }) => (selected ? theme.color.primary : 'transparent')};
`

export const TocList = styled.ul`
  padding: 0;
  list-style-type: none;
  padding-left: 0.8em;
  padding-top: ${({ theme }) => theme.padding.smallerer};
  font-size: 0.8em;
  margin: 0;
`

export const TocItem = styled.li`
  padding: ${({ theme }) => theme.padding.smallerer};
`
