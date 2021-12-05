import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 定义全局自定义指令
Vue.directive('color', function(el, binding) {
  el.style.color = binding.value
})

new Vue({
  render: h => h(App),
}).$mount('#app')