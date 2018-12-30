import { css } from 'emotion'

export const edit = css`
  position: absolute;
  top: 85px;
  right: var(--padding-5);
`

export const content = css`
  position: relative;
  width: 700px;
  min-height: 100vh;
  margin: 0 auto;
  box-sizing: border-box;
  padding: var(--padding-6) var(--padding-5);
  font-family: 'Nunito', sans-serif;
  font-size: 17px;
  color: var(--color-black-1);

  @media (max-width: 700px) {
    width: 100%;
    padding: var(--padding-5);
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
    color: var(--color-primary);
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
  ol,
  ul {
    margin-top: var(--padding-5);
    margin-bottom: var(--padding-5);
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
    color: var(--color-black-2);
    text-decoration: none;
    font-size: 14px;
    text-transform: uppercase;
  }
  > a {
    font-size: 10px;
  }
`
