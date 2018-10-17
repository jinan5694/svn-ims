const routes = []

routes.push({
  meta: { title: 'home' },
  path: '/master/home',
  component: () => import('@/views/Home.vue')
})

routes.push({
  meta: { title: 'about' },
  path: '/master/about',
  component: () => import('@/views/About.vue')
})

export default routes
