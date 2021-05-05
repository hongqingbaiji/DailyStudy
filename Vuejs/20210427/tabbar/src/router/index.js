import Vue from 'vue';
import Router from 'vue-router';

const Home = () =>
  import ('../views/tabbar/home/Home');
const Category = () =>
  import ('../views/tabbar/category/Category');
const Shopcart = () =>
  import ('../views/tabbar/shopcart/Shopcart');
const Profile = () =>
  import ('../views/tabbar/profile/Profile');

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
  component: Shopcart
}, {
  path: '/profile',
  component: Profile
}];
const router = new Router({
  routes,
  mode: 'history'
});

export default router;