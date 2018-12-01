import { css } from 'emotion'

export const wrapper = css`
  position: fixed;
  top: 100px;
  left: calc(50vw + 400px);
  color: var(--color-black-1);

  ul {
    list-style-type: none;
    padding-left: var(--padding-2);
    font-size: 0.9em;
    line-height: 20px;
  }

  > ul {
    padding-left: 0;
    font-size: 0.8em;
  }

  a {
    cursor: pointer;
    display: block;
    color: inherit;
    text-decoration: none;
  }
  a:hover {
    color: var(--color-black-2);
  }

  @media (max-width: 1279px) {
    display: none;
  }
`
