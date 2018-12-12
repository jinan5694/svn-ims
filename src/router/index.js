import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login'
import Index from '@/views/Index'

import { isLoggedIn } from '@/common/login'
import routes from '@/router/routes'

Vue.use(Router)

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        onlyWhenLoggedOut: true, // 只允许未登录时访问
        public: true,
        title: '登录'
      },
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
        {
          path: '/play',
          name: 'play',
          meta: { title: '实验室' },
          component: () => import('@/views/Play.vue')
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

router.beforeEach((to, from, next) => {
  const isPublic = to.meta.public
  const onlyWhenLoggedOut = to.meta.onlyWhenLoggedOut
  const loggedIn = isLoggedIn()

  // 不是公共权限并且未登录，拦截到登录页
  if (!isPublic && !loggedIn) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }

  // 已登录并且是登出页，拦截到首页
  if (loggedIn && onlyWhenLoggedOut) {
    return next('/')
  }

  next()
})

router.afterEach((to, from) => {
  // todo
})

export default router
