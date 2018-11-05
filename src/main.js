import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
// plugins
import './plugins/axios'
import './plugins/element'
import './plugins/dictionary'
import './plugins/filters'
import './plugins/locale'
import './plugins/lodash'
// components register
import './components/register.js'
// css
import './css/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
