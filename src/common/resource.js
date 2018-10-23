
const resource = [{
  path: 'master',
  icon: 'settings',
  label: '主数据',
  children: [{
    path: '/masterData/product/list',
    label: '商品管理'
  }, {
    path: '/masterData/customer/list',
    label: '客户管理'
  }, {
    path: '/masterData/vendor/list',
    label: '供应商管理'
  }, {
    path: '/masterData/warehouse/list',
    label: '仓库管理'
  }]
}]

export default resource
