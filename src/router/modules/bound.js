/**
 * 出入库相关
 * 【入库】【退入库】
 * 【出库】【退出库】
 */

const routes = []

// 入库单
routes.push({
  meta: { title: '入库单列表' },
  path: 'bound/inbound/list',
  component: () => import('@/views/bound/inbound/List.vue')
})
routes.push({
  meta: { title: '新建入库单' },
  path: 'bound/inbound/add',
  component: () => import('@/views/bound/inbound/Add.vue')
})
routes.push({
  meta: { title: '编辑入库单' },
  path: 'bound/inbound/edit/:id',
  component: () => import('@/views/bound/inbound/Edit.vue')
})
routes.push({
  meta: { title: '查看入库单' },
  path: 'bound/inbound/view/:id',
  component: () => import('@/views/bound/inbound/View.vue')
})

// 出库单
routes.push({
  meta: { title: '出库单列表' },
  path: 'bound/outbound/list',
  component: () => import('@/views/bound/outbound/List.vue')
})
routes.push({
  meta: { title: '新建出库单' },
  path: 'bound/outbound/add',
  component: () => import('@/views/bound/outbound/Add.vue')
})
routes.push({
  meta: { title: '编辑出库单' },
  path: 'bound/outbound/edit/:id',
  component: () => import('@/views/bound/outbound/Edit.vue')
})
routes.push({
  meta: { title: '查看出库单' },
  path: 'bound/outbound/view/:id',
  component: () => import('@/views/bound/outbound/View.vue')
})

export default routes
