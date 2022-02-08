//配置路由相关的信息

import VueRouter from 'vue-router';
import Vue from 'vue';
// import Home from '../components/Home';
// import About from '../components/About';
// import User from '../components/User';

// 使用懒加载的方式
const Home = () =>
  import ('../components/Home');
const About = () =>
  import ('../components/About');
const User = () =>
  import ('../components/User');
const HomeNews = () =>
  import ('../components/HomeNews');
const HomeMessage = () =>
  import ('../components/HomeMessage');
const Profile = () =>
  import ('../components/Profile');

// 解决重复点击报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 1.通过Vue.use(插件) 来安装这个插件 
Vue.use(VueRouter);

//创建VueRouer对象
const routes = [
  //这里写路由和页面的映射关系
  {
    path: '/', //配置路由的默认路径
    redirect: '/home' // 重定向页面
  }, {
    path: '/home', //配置路由映射
    component: Home, //创建路由组件
    meta: {
      title: '首页'
    },
    children: [{
      path: '/',
      redirect: '/home/news'
    }, {
      path: 'news',
      component: HomeNews
    }, {
      path: 'message',
      component: HomeMessage
    }]
  }, {
    path: '/about',
    component: About,
    meta: {
      title: '关于'
    },
  }, {
    path: '/user/:uid',
    component: User,
    meta: {
      title: '用户'
    },
  }, {
    path: '/profile',
    component: Profile,
    meta: {
      title: '档案'
    },
  }
];
// 2. 创建VueRouter对象
const router = new VueRouter({
  // 配置路由和组件之间的应用关系
  routes,
  mode: 'history', //使用哪种模式加载URL，默认值是hash模式；会少一个#号
  linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title;
  next();
});

// 3. 将router对象传入到vue实例中
export default router