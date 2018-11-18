import styled from '../../styled-components'

export const Edit = styled.a`
  position: absolute;
  top: 85px;
  right: ${({ theme }) => theme.padding.large};
`

export const Content = styled.div`
  position: relative;
  width: 700px;
  min-height: 100vh;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.white};
  padding: ${({ theme }) => theme.padding.large};
  font-family: 'Nunito', sans-serif;
  font-size: 17px;
  color: ${({ theme }) => theme.color.black};

  @media (max-width: 700px) {
    width: 100%;
    padding: ${({ theme }) => `${theme.padding.large} ${theme.padding.normal}`};
  }

  ol {
    list-style: none;
    counter-reset: li;
  }
  ol li {
    counter-increment: li;
  }
  ol li::before {
    content: counter(li);
    color: ${({ theme }) => theme.color.primary};
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
  ol,
  ul {
    margin-top: ${({ theme }) => theme.padding.large};
    margin-bottom: ${({ theme }) => theme.padding.large};
  }
  li {
    margin-bottom: 15px;
  }
  > p {
    line-height: 26px;
  }
  > h1,
  h2,
  h3,
  h4 {
    font-family: 'Helvetica Neue', Arial;
  }
  > h2,
  h3,
  h4 {
    padding-top: 50px;
  }
  a {
    color: ${({ theme }) => theme.color.lighten(theme.color.dark, 1.5)};
    text-decoration: none;
    font-size: 14px;
    text-transform: uppercase;
  }
  > a {
    font-size: 10px;
  }
`
