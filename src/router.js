import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login/Login'
import Index from './views/Index'

import { hasLogged } from './common/login'
import routes from '@/common/routes'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { title: '登录', public: true },
      component: Login
    },
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        ...routes,
        {
          path: '*',
          name: '404',
          component: () => import('@/views/404.vue')
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
