import theme from './theme'

const style = document.createElement('style')
style.innerHTML = `
  html, body {
    margin: 0;
    height: 100%;
  }
  body {
    background-color: #133046;
    color: #FAFAFA;
    font-family: Helvetica Neue;
    overflow: hidden;
  }
  #app {
    height: 100%;
  }
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .wrapper-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50%;
  }
  .todos-wrapper {
    width: 100%;
    background-color: ${theme.color.lighten(theme.color.dark, 0.2)};
    padding: ${theme.padding.small};
    border-radius: ${theme.borderRadius.large};
  }
  .todos-wrapper form {
    display: flex;
  }
  .todos-wrapper input {
    flex: 1;
    display: block;
    border: 0;
    margin: 0;
    outline: none;
    background-color: transparent;
    font-size: ${theme.fontSize.larger};
    color: ${theme.color.white};
    height: 40px;
    ::placeholder {
      color: ${theme.color.fade(theme.color.white, 0.5)};
    }
  }
  .todos-wrapper button {
    flex: 0 0 50px;
    outline: none;
    border-radius: ${theme.borderRadius.normal};
    background-color: ${theme.color.primary};
    padding: ${theme.padding.smaller};
    text-transform: uppercase;
    border: 0;
    color: ${theme.color.white};
    font-weight: bold;
    cursor: pointer;
    :hover:enabled {
      background-color: ${theme.color.lighten(theme.color.primary, 0.1)};
    }
    :disabled {
      cursor: default;
      opacity: 0.5;
    }
  }
  .todos-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    align-self: stretch;
  }
  .todo {
    display: flex;
    cursor: pointer;
    align-items: center;
    padding: ${theme.padding.normal};
    font-size: ${theme.fontSize.larger};
  }
  .todo-completed {
    outline: none;
    border: 0;
    background: transparent;
    margin-right: ${theme.padding.normal};
    font-size: ${theme.fontSize.larger};
    color: ${theme.color.fade(theme.color.secondary, 0.8)};
  }
  .todo-completed-complete {
    color: ${theme.color.secondary};
  }
`
document.querySelector('head').appendChild(style)
