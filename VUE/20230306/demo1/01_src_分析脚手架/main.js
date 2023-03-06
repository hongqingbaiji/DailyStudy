import Vue from 'vue' // 引入vue
import App from './App.vue' // 引入 App组件，它是所有组件的父组件

Vue.config.productionTip = false // 关闭Vue的生产提示

new Vue({
  render: h => h(App)
}).$mount('#app')
