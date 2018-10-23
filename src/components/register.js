/**
 * 组件注册
 * 添加组件时，请按首字母顺序排序，方便查找
 */
import Vue from 'vue'

import ConfirmButton from './ConfirmButton'
import DataTable from './DataTable'
import Icon from './Icon'
import Logo from './Logo'
import Search from './Search'
import Page from './Page'
import BackButton from './BackButton'
import Button from './Button'

const components = [
  ConfirmButton,
  DataTable,
  Icon,
  Logo,
  Page,
  BackButton,
  Button,
  Search
]

components.forEach(component => {
  if (component.name) {
    Vue.component(component.name, component)
  } else {
    console.error(`[Component register] name is required. "${component.__file}"`)
  }
})
