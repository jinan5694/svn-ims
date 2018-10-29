const resource = [
  {
    icon: 'home',
    label: '首页',
    path: '/'
  },
  {
    icon: 'dns',
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
    icon: 'storage',
    label: '仓库',
    path: 'bound',
    children: [
      {
        label: '入库',
        path: '/bound/inbound/list'
      }
    ]
  },
  {
    icon: 'folder',
    label: '档案',
    path: 'masterData',
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
  },
  {
    icon: 'settings',
    label: '系统',
    path: 'system',
    children: [
      {
        label: '员工管理',
        path: '/system/employee/list'
      }
    ]
  }
]

export default resource
