import Vue from 'vue'

import Icon from './Icon'
import Logo from './Logo'

const components = [
  Icon,
  Logo
]

components.forEach(component => {
  Vue.component(component.name, component)
})
