import Vue from 'vue/dist/vue'
import App from './components/App.vue'

// eslint-disable-next-line
new Vue({
  el: document.querySelector('#app'),
  template: '<App/>',
  components: {
    App,
  },
})
