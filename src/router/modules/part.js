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
routes.push({
  meta: { title: '采购查看' },
  path: 'part/purchase/view/:id',
  component: () => import('@/views/part/purchase/View.vue')
})
routes.push({
  meta: { title: '采购编辑' },
  path: 'part/purchase/edit/:id',
  component: () => import('@/views/part/purchase/Edit.vue')
})
// sale
routes.push({
  meta: { title: '销售新建' },
  path: 'part/sale/add',
  component: () => import('@/views/part/sale/Add.vue')
})
routes.push({
  meta: { title: '销售列表' },
  path: 'part/sale/list',
  component: () => import('@/views/part/sale/List.vue')
})
routes.push({
  meta: { title: '销售查看' },
  path: 'part/sale/view/:id',
  component: () => import('@/views/part/sale/View.vue')
})
routes.push({
  meta: { title: '销售编辑' },
  path: 'part/sale/edit/:id',
  component: () => import('@/views/part/sale/Edit.vue')
})

export default routes
