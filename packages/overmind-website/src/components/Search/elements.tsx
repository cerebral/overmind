import styled from '../../styled-components'

export const Wrapper = styled.div`
  position: relative;
`

export const InputElement = styled.input`
  border: 0;
  outline: 0;
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.white};
  padding: ${({ theme }) => theme.padding.smaller};
  margin: ${({ theme }) => `0 ${theme.padding.small}`};
`

export const SearchResult = styled.div`
  position: absolute;
  top: 35px;
  right: 0;
  width: 300px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  margin: ${({ theme }) => `0 ${theme.padding.small}`};
  box-shadow: 0px 10px 11px -6px rgba(0, 0, 0, 0.28);
`

export const SearchResultItem = styled.a`
  padding: ${({ theme }) => theme.padding.small};
  color: ${({ theme }) => theme.color.black};
  display: block;
  text-decoration: none;
  :hover {
    background-color: ${({ theme }) =>
      theme.color.fade(theme.color.black, 0.99)};
  }
  > span {
    color: ${({ theme }) => theme.color.primary};
    font-size: ${({ theme }) => theme.fontSize.small};
    margin-right: ${({ theme }) => theme.padding.smaller};
  }
`

export const SearchText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.small};
  padding: ${({ theme }) => theme.padding.small};
`
