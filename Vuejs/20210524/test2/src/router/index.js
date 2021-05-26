import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>
  import ('../components/tabbar/home/Home');
const Cartgory = () =>
  import ('../components/tabbar/cartgory/Cartgory');
const Shop = () =>
  import ('../components/tabbar/shop/Shop');
const Profile = () =>
  import ('../components/tabbar/profile/Profile');
const News = () =>
  import ('../components/tabbar/home/News');
const Message = () =>
  import ('../components/tabbar/home/Message');

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  component: Home,
  children: [{
    path: '/',
    redirect: "news"
  }, {
    path: 'news',
    component: News
  }, {
    path: 'message',
    component: Message
  }]
}, {
  path: '/cartgory',
  component: Cartgory
}, {
  path: '/shop',
  component: Shop
}, {
  path: '/profile/:id',
  component: Profile
}]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router