import styled from '../../styled-components'

export const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) =>
    theme.color.lighten(theme.color.dark, 0.2)};
  padding: ${({ theme }) => theme.padding.small};
  border-radius: ${({ theme }) => theme.borderRadius.large};
`

export const Form = styled.form`
  display: flex;
`

export const Input = styled.input`
  flex: 1;
  display: block;
  border: 0;
  margin: 0;
  outline: none;
  background-color: transparent;
  font-size: ${({ theme }) => theme.fontSize.larger};
  color: ${({ theme }) => theme.color.white};
  height: 40px;
  ::placeholder {
    color: ${({ theme }) => theme.color.fade(theme.color.white, 0.5)};
  }
`

export const Button = styled.button`
  flex: 0 0 50px;
  outline: none;
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  background-color: ${({ theme }) => theme.color.primary};
  padding: ${({ theme }) => theme.padding.smaller};
  text-transform: uppercase;
  border: 0;
  color: ${({ theme }) => theme.color.white};
  font-weight: bold;
  cursor: pointer;
  :hover:enabled {
    background-color: ${({ theme }) =>
      theme.color.lighten(theme.color.primary, 0.1)};
  }
  :disabled {
    cursor: default;
    opacity: 0.5;
  }
`
