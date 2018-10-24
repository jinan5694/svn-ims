/**
 * 持久化一些业务输入作为字典使用
 */
export default {
  state: {
    // 员工
    employees: [],
    // 供应商
    vendors: []
  },
  mutations: {
    setVendors (state, vendors) {
      state.vendors = vendors
    }
  },
  actions: {
    setVendors ({ commit }, vue) {
      const url = '/VendorService/query'
      const params = [
        { where: { and: [{ enableFlag: 'System_EnableFlag_1' }] } }
      ]
      return vue.$axios.get(url, { params: params }).then(resp => {
        commit('setVendors', resp.data)
      })
    }
  }
}
