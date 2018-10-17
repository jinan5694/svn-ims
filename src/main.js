import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
// plugins
import './plugins/element.js'
import './plugins/axios.js'
import './plugins/locale.js'
// components register
import './components/register.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
