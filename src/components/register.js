import Vue from 'vue'

import Icon from './Icon'
import Logo from './Logo'
import Page from './Page'

const components = [
  Icon,
  Logo,
  Page
]

components.forEach(component => {
  Vue.component(component.name, component)
})
