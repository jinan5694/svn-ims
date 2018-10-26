const routes = []

// employee
routes.push({
  meta: { title: '员工列表' },
  path: 'system/employee/list',
  component: () => import('@/views/system/employee/List.vue')
})
routes.push({
  meta: { title: '员工新建' },
  path: 'system/employee/add',
  component: () => import('@/views/system/employee/Add.vue')
})
routes.push({
  meta: { title: '员工编辑' },
  path: 'system/employee/edit/:id',
  component: () => import('@/views/system/employee/Edit.vue')
})
routes.push({
  meta: { title: '员工查看' },
  path: 'system/employee/view/:id',
  component: () => import('@/views/system/employee/View.vue')
})

export default routes
