import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login/Login'
import Index from './views/Index'

import { hasLogged } from './common/login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') {
    if (hasLogged()) {
      next('/')
    } else {
      next()
    }
  } else {
    if (hasLogged() || to.meta.public) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach((to, from) => {
  // todo
})

export default router
