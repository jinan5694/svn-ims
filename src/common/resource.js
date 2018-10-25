
const resource = [
  {
    icon: 'settings',
    label: '商品',
    path: 'part',
    children: [
      {
        label: '采购订单',
        path: '/part/purchase/list'
      }
    ]
  },
  {
    icon: 'settings',
    label: '主数据',
    path: 'master',
    children: [
      {
        label: '商品管理',
        path: '/masterData/product/list'
      },
      {
        label: '批次管理',
        path: '/masterData/prodBatch/list'
      },
      {
        label: '客户管理',
        path: '/masterData/customer/list'
      },
      {
        label: '供应商管理',
        path: '/masterData/vendor/list'
      },
      {
        label: '仓库管理',
        path: '/masterData/warehouse/list'
      },
      {
        label: '库区管理',
        path: '/masterData/zone/list'
      },
      {
        label: '库位管理',
        path: '/masterData/bin/list'
      }
    ]
  }
]

export default resource
