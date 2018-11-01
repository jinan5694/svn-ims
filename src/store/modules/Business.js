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
    setEmployees (state, employees) {
      state.employees = employees
    },
    setVendors (state, vendors) {
      state.vendors = vendors
    }
  },
  actions: {
    setEmployees ({ commit }, vue) {
      const url = '/EmployeeService/query'
      const params = [
        { where: { and: [{ enableFlag: 'System_EnableFlag_1' }] } }
      ]
      return vue.$axios.get(url, { params: params }).then(resp => {
        commit('setEmployees', resp.data)
      })
    },
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
