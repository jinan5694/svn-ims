const routes = []

routes.push({
  meta: { title: 'home' },
  path: '/home',
  component: () => import('@/views/Home.vue')
})

routes.push({
  meta: { title: 'about' },
  path: '/about',
  component: () => import('@/views/About.vue')
})

export default routes
