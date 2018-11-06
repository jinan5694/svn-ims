/**
 * 持久化一些业务输入作为字典使用
 */
export default {
  state: {
    // 客户
    customers: [],
    // 员工
    employees: [],
    // 供应商
    vendors: []
  },
  mutations: {
    setCustomers (state, customers) {
      state.customers = customers
    },
    setEmployees (state, employees) {
      state.employees = employees
    },
    setVendors (state, vendors) {
      state.vendors = vendors
    }
  },
  actions: {
    setCustomers ({ commit }, vue) {
      const url = '/CustomerService/query'
      const params = [
        { where: { and: [{ enableFlag: 'System_EnableFlag_1' }] } }
      ]
      return vue.$axios.get(url, { params: params }).then(resp => {
        commit('setCustomers', resp.data)
      })
    },
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
