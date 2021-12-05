import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/tabs/Home.vue'
import Movie from '@/components/tabs/Movie.vue'
import About from '@/components/tabs/About.vue'
import Tab1 from '@/components/tabs/Tab1.vue'
import Tab2 from '@/components/tabs/Tab2.vue'

import Main from '@/components/tabs/Main.vue'
import Login from '@/components/tabs/Login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/movie/:mid', component: Movie, props: true },
    {
      path: '/about',
      component: About,
      // redirect: '/about/tab1',
      children: [
        { path: '', component: Tab1 },
        { path: 'tab2', component: Tab2 }
      ]
    },
    { path: '/main', component: Main },
    { path: '/login', component: Login }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/main') {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
