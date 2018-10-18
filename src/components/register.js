/**
 * 组件注册
 * 添加组件时，请按首字母顺序排序，方便查找
 */
import Vue from 'vue'

import DataTable from './DataTable'
import Icon from './Icon'
import Logo from './Logo'
import Page from './Page'

const components = [
  DataTable,
  Icon,
  Logo,
  Page
]

components.forEach(component => {
  Vue.component(component.name, component)
})
