import Vue from 'vue'
import App from './App2.vue'
import axios from 'axios'
import router from '@/router'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://www.liulongbin.top:3006'
Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
