import styled from '../../styled-components'

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 200px;
  margin: 0 ${({ theme }) => theme.padding.small};
`

export const Selector = styled<{ isOpen: boolean }, 'div'>('div')`
  display: flex;
  flex: 1;
  align-items: center;
  cursor: pointer;
  background-color: ${({ theme }) =>
    theme.color.lighten(theme.color.dark, -0.5)};
  cursor: pointer;
  padding: ${({ theme }) => theme.padding.smaller};
  color: ${({ theme }) => theme.color.fade(theme.color.white, 0.25)};
  font-size: ${({ theme }) => theme.fontSize.small};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.normal};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.normal};
  text-transform: lowercase;
  :hover {
    background-color: ${({ isOpen, theme }) =>
      theme.color.lighten(theme.color.dark, isOpen ? -0.5 : -0.4)};
  }
`

export const Chevron = styled.span`
  margin-left: auto;
  font-size: ${({ theme }) => theme.fontSize.smallest};
`

export const Dropdown = styled<
  {
    above?: boolean
  },
  'div'
>('div')`
  position: absolute;
  width: 100%;
  ${({ above }) => `${above ? 'bottom' : 'top'}: calc(100% - 1px)`};
  background-color: ${({ theme }) =>
    theme.color.lighten(theme.color.dark, -0.5)};
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius.normal};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.normal};
`

export const Option = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.padding.smaller};
  color: ${({ theme }) => theme.color.fade(theme.color.white, 0.25)};
  font-size: ${({ theme }) => theme.fontSize.small};
  text-transform: lowercase;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) =>
      theme.color.lighten(theme.color.dark, -0.4)};
  }
  :last-child {
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius.normal};
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius.normal};
  }
`

export const TsImageWrapper = styled.div`
  display: flex;
  padding: 4px;
  background-color: ${({ theme }) =>
    theme.color.lighten(theme.color.dark, -0.5)};
  align-items: center;
  border-top-left-radius: ${({ theme }) => theme.borderRadius.normal};
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius.normal};
  border-right: 1px solid
    ${({ theme }) => theme.color.lighten(theme.color.dark, -0.3)};
`

export const TSImage = styled<
  {
    grayscale?: boolean
  },
  'img'
>('img')`
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  cursor: pointer;
  margin: ${({ theme }) => theme.padding.smallerer};
  box-shadow: ${({ grayscale }) =>
    grayscale ? 'inset 0px 0px 20px 1px rgba(0,0,0,0.5)' : 'none'};
  opacity: ${({ grayscale }) => (grayscale ? '0.5' : '1')};
`
