// 使用 common.js的模块化规范
const { add, mul } = require('./js/mathUtils.js');
console.log(add(20, 30));
console.log(mul(20, 30));

// 使用es6的模块化的规划
import { name, age, sex } from './js/info';
console.log(name, age, sex);

// 依赖css文件
require('./css/normal.css');
require('./css/special.less');

// 使用Vue进行开发
import Vue from 'vue';
// 导入App.vue
import App from './vue/App.vue';

new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  }
});

document.writeln(`<h3>1234</h3>`);