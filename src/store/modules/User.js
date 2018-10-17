export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setUser ({ commit }, vue) {
      const url = '/UserService/getCurrentUser'
      return vue.$axios.get(url).then(resp => {
        commit('setUser', resp.data)
      })
    }
  }
}
