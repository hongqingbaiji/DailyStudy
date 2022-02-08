import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router, //在Vue实例中挂载router实例
  render: h => h(App)
})