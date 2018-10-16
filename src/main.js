import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// plugins
import './plugins/element.js'
import './plugins/axios.js'
// components register
import './components/register.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
