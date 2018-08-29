import styled from '../../styled-components'
import theme from '../../theme'

export const Item = styled.li`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: ${theme.padding.normal};
  font-size: ${theme.fontSize.larger};
`

export const Completed = styled('button')`
  outline: none;
  border: 0;
  background: transparent;
  margin-right: ${theme.padding.normal};
  font-size: ${theme.fontSize.larger};
  color: ${({ completed }) =>
    completed
      ? theme.color.secondary
      : theme.color.fade(theme.color.secondary, 0.8)};
`
