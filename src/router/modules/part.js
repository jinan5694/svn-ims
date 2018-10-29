const routes = []

// purchase
routes.push({
  meta: { title: '采购新建' },
  path: 'part/purchase/add',
  component: () => import('@/views/part/purchase/Add.vue')
})
routes.push({
  meta: { title: '采购列表' },
  path: 'part/purchase/list',
  component: () => import('@/views/part/purchase/List.vue')
})
// routes.push({
//   meta: { title: '采购查看' },
//   path: 'part/purchase/view/:id',
//   component: () => import('@/views/part/purchase/View.vue')
// })
// routes.push({
//   meta: { title: '采购编辑' },
//   path: 'part/purchase/edit/:id',
//   component: () => import('@/views/part/purchase/Edit.vue')
// })

export default routes
