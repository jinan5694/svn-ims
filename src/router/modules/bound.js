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

export default routes
