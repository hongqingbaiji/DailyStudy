import Vue from 'vue';
import Router from 'vue-router';

// 路由的懒加载
const Home = () =>
  import ('../views/home/Home');
const Category = () =>
  import ('../views/category/Category');
const ShopCart = () =>
  import ('../views/shopcart/ShopCart');
const Profile = () =>
  import ('../views/profile/Profile');

//解决重复点击报错的问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(Router);

const routes = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  component: Home
}, {
  path: '/category',
  component: Category
}, {
  path: '/shopcart',
  component: ShopCart
}, {
  path: '/profile',
  component: Profile
}];

const router = new Router({
  routes,
  mode: 'history'
});
export default router