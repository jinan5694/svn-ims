const routes = []

// product
routes.push({
  meta: { title: '商品列表' },
  path: 'masterData/product/list',
  component: () => import('@/views/masterData/product/List.vue')
})
routes.push({
  meta: { title: '商品查看' },
  path: 'masterData/product/view/:id',
  component: () => import('@/views/masterData/product/View.vue')
})
routes.push({
  meta: { title: '商品新建' },
  path: 'masterData/product/add',
  component: () => import('@/views/masterData/product/Add.vue')
})
routes.push({
  meta: { title: '商品编辑' },
  path: 'masterData/product/edit/:id',
  component: () => import('@/views/masterData/product/Edit.vue')
})

// customer
routes.push({
  meta: { title: '客户列表' },
  path: 'masterData/customer/list',
  component: () => import('@/views/masterData/customer/List.vue')
})
routes.push({
  meta: { title: '客户查看' },
  path: 'masterData/customer/view/:id',
  component: () => import('@/views/masterData/customer/View.vue')
})
routes.push({
  meta: { title: '客户新建' },
  path: 'masterData/customer/add',
  component: () => import('@/views/masterData/customer/Add.vue')
})
routes.push({
  meta: { title: '客户编辑' },
  path: 'masterData/customer/edit/:id',
  component: () => import('@/views/masterData/customer/Edit.vue')
})

// vendor
routes.push({
  meta: { title: '供应商列表' },
  path: 'masterData/vendor/list',
  component: () => import('@/views/masterData/vendor/List.vue')
})
routes.push({
  meta: { title: '供应商查看' },
  path: 'masterData/vendor/view/:id',
  component: () => import('@/views/masterData/vendor/View.vue')
})
routes.push({
  meta: { title: '供应商新建' },
  path: 'masterData/vendor/add',
  component: () => import('@/views/masterData/vendor/Add.vue')
})
routes.push({
  meta: { title: '供应商编辑' },
  path: 'masterData/vendor/edit/:id',
  component: () => import('@/views/masterData/vendor/Edit.vue')
})

// warehouse
routes.push({
  meta: { title: '仓库列表' },
  path: 'masterData/warehouse/list',
  component: () => import('@/views/masterData/warehouse/List.vue')
})
routes.push({
  meta: { title: '仓库新建' },
  path: 'masterData/warehouse/add',
  component: () => import('@/views/masterData/warehouse/Add.vue')
})
routes.push({
  meta: { title: '仓库查看' },
  path: 'masterData/warehouse/edit/:id',
  component: () => import('@/views/masterData/warehouse/Edit.vue')
})
routes.push({
  meta: { title: '仓库编辑' },
  path: 'masterData/warehouse/view/:id',
  component: () => import('@/views/masterData/warehouse/View.vue')
})

export default routes
