import styled from '../../styled-components'

export const Iframe = styled.iframe`
  margin: ${({ theme }) => theme.padding.small};
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${({ theme }) => theme.padding.large};
`

export const Container = styled.div`
  display: flex;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`

export const Cell = styled.div`
  max-width: 400px;
  color: ${({ theme }) => theme.color.white};
  padding: ${({ theme }) => theme.padding.normal};
`

export const Title = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.large};
`

export const List = styled.ul`
  padding-left: ${({ theme }) => theme.padding.normal};
  color: ${({ theme }) => theme.color.white};
`

export const ListItem = styled.li`
  margin-bottom: ${({ theme }) => theme.padding.small};
`

export const Link = styled.a`
  color: ${({ theme }) => theme.color.primary};
  text-decoration: none;
`
