import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
// plugins
import './plugins/element'
import './plugins/axios'
import './plugins/dictionary'
import './plugins/locale'
import './plugins/filters'
// components register
import './components/register.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
