// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import { config } from 'vue/types/umd';
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  // components: { App },
  // template: '<App/>'
  render: function(createElement) {
    return createElement(App)
  }
})