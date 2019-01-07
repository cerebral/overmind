import { css } from 'emotion'

export const wrapper = css`
  background-color: inherit;
  padding-top: 100px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;

  @media (max-width: 700px) {
    padding: var(--padding-5);
  }

  h1,
  h2 {
    color: var(--color-dark-1);
  }
`

export const evaluated = css`
  background-color: var(--color-white-2);
  color: var(--color-dark-1);
  padding: var(--padding-4);
  border-radius: 3px;
  margin-top: 50px;
  max-width: 700px;
  > strong {
    color: red;
  }
`

export const summary = css`
  margin-top: 50px;
  max-width: 700px;
  position: relative;
  font-size: var(--font-size-4);
  text-align: center;
  font-style: italic;
  line-height: 32px;
  :before {
    content: '“';
    color: var(--color-gray-1);
    font-size: 48px;
    font-weight: bold;
  }
  :after {
    position: absolute;
    color: var(--color-gray-1);
    content: '”';
    font-size: 48px;
    font-weight: bold;
  }
  @media (max-width: 700px) {
    font-size: var(--font-size-2);
    line-height: 26px;
    :before,
    :after {
      font-size: 32px;
    }
  }
`

export const container = css`
  margin-left: auto;
  margin-right: auto;
  max-width: 1100px;
  width: 100%;
`

export const valueProposition = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0 var(--padding-4);
  box-sizing: border-box;
  align-items: center;
  > div {
    flex: 1;
    width: auto;
  }
  > div:nth-child(1) {
    margin-right: 40px;
  }
  margin-bottom: 100px;
`

export const valuePropositionMobile = css`
  flex-direction: column;
  padding: 0;
  > div {
    width: 100%;
  }
  > div:nth-child(1) {
    margin-right: 0;
  }
  margin-bottom: 25px;
`

export const iframeWrapper = css`
  position: relative;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const iframe = css`
  border: 0;
  width: 100%;
  height: 500px;
  box-shadow: 0px 0px 20px -10px rgba(0, 0, 0, 0.75);
  border-radius: 4px;
  overflow: hidden;
`

export const banner = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
  > h1 {
    font-weight: normal;
    letter-spacing: 0.2rem;
    text-align: center;
    font-size: 28px;
  }
`

export const bannerMobile = css`
  margin-bottom: 50px;
`
