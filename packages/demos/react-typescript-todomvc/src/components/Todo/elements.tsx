import styled from '../../styled-components'

export const Item = styled.li`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: ${({ theme }) => theme.padding.normal};
  font-size: ${({ theme }) => theme.fontSize.larger};
`

export const Completed = styled<
  {
    completed: boolean
  },
  'button'
>('button')`
  outline: none;
  border: 0;
  background: transparent;
  margin-right: ${({ theme }) => theme.padding.normal};
  font-size: ${({ theme }) => theme.fontSize.larger};
  color: ${({ theme, completed }) =>
    completed
      ? theme.color.secondary
      : theme.color.fade(theme.color.secondary, 0.8)};
`
