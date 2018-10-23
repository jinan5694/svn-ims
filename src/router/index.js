import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login'
import Index from '@/views/Index'

import { hasLogged } from '@/common/login'
import routes from '@/router/routes'

Vue.use(Router)

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { title: '登录', public: true },
      component: Login
    },
    {
      path: '/',
      meta: { title: '首页' },
      component: Index,
      children: [
        {
          path: '/',
          name: 'dashboard',
          meta: { title: '工作台' },
          component: () => import('@/views/Dashboard.vue')
        },
        ...routes,
        {
          path: '*',
          name: 'notFound',
          meta: { title: 'Not Found' },
          component: () => import('@/views/NotFound.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.public) {
    next()
  } else {
    if (hasLogged()) {
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
