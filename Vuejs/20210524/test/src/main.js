import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd'

createApp(App, Antd).use(router).use(Antd).mount('#app')