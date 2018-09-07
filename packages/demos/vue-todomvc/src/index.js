import { injectGlobal } from './styled-components'
import App from './components/App'
import Vue from 'vue'

injectGlobal`
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
`
Vue.config.productionTip = false
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render() {
    return <App />
  },
})
