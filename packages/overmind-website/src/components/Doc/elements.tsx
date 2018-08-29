import styled from '../../styled-components'

export const Content = styled.div`
  width: 700px;
  min-height: 100vh;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.white};
  padding: ${({ theme }) => theme.padding.large};
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  color: ${({ theme }) => theme.color.black};

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
  > pre {
    color: #ccc;
    background: ${({ theme }) => theme.color.lighten(theme.color.dark, -0.2)};
    border-radius: ${({ theme }) => theme.borderRadius.normal};
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  > pre * {
    font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New,
      monospace;
    font-size: 12px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #999;
  }

  .token.punctuation {
    color: #ccc;
  }

  .token.tag,
  .token.attr-name,
  .token.namespace,
  .token.deleted {
    color: #fc929e;
  }

  .token.function-name {
    color: #6196cc;
  }

  .token.boolean,
  .token.number,
  .token.function {
    color: #79b6f2;
  }

  .token.property,
  .token.class-name,
  .token.constant,
  .token.symbol {
    color: #fac863;
  }

  .token.selector,
  .token.important,
  .token.atrule,
  .token.keyword,
  .token.builtin {
    color: #c5a5c5;
  }

  .token.string,
  .token.char,
  .token.attr-value,
  .token.regex,
  .token.variable {
    color: #8dc891;
  }

  .token.operator,
  .token.entity,
  .token.url {
    color: #67cdcc;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  .token.inserted {
    color: green;
  }
`
