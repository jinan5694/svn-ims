/**
 * 组件注册
 * 添加组件时，请按首字母顺序排序，方便查找
 */
import Vue from 'vue'

import BackButton from './BackButton'
import BaseTable from './BaseTable'
import Button from './Button'
import ConfirmButton from './ConfirmButton'
import DataTable from './DataTable'
import GridForm from './GridForm'
import Icon from './Icon'
import InputNumber from './InputNumber'
import Logo from './Logo'
import Number from './Number'
import Page from './Page'
import Search from './Search'
import Toolbar from './Toolbar'
import TopBottomLayout from './TopBottomLayout'
import Unit from './Unit'

const components = [
  BackButton,
  BaseTable,
  Button,
  ConfirmButton,
  DataTable,
  GridForm,
  Icon,
  InputNumber,
  Logo,
  Number,
  Page,
  Search,
  Toolbar,
  TopBottomLayout,
  Unit
]

components.forEach(component => {
  if (component.name) {
    Vue.component(component.name, component)
  } else {
    console.error(`[Component register] name is required. "${component.__file}"`)
  }
})
