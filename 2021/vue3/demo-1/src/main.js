// 1、按需导入createApp 函数
import { createApp } from 'vue'
// 2、导入要渲染的组件
import App from './App.vue'

const app = createApp(App).mount('#app')
