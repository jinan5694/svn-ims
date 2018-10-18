const routes = []

routes.push({
  meta: { title: 'home' },
  path: '/master/home',
  component: () => import('@/views/Home.vue')
})

routes.push({
  meta: { title: '实验室' },
  path: '/play',
  component: () => import('@/views/Play.vue')
})

export default routes
