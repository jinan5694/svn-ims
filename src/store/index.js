import Vue from 'vue'
import Vuex from 'vuex'
import Dictionary from './modules/Dictionary'
import User from './modules/User'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hasReady: false
  },
  mutations: {
    readyComplete (state) {
      state.hasReady = true
    }
  },
  actions: {

  },
  modules: {
    Dictionary,
    User
  }
})
