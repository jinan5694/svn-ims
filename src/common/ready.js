import Axios from 'axios'

function init (vue) {
  return fetchUser(vue).then(() => {
    const tasks = []

    tasks.push(fetchDicts(vue))
    tasks.push(fetchVendors(vue))
    tasks.push(fetchEmployees(vue))

    return Axios.all(tasks)
  })
}

// 获取当前用户信息
function fetchUser (vue) {
  return vue.$store.dispatch('setUser', vue)
}
// 获取字典数据
function fetchDicts (vue) {
  return vue.$store.dispatch('setDicts', vue)
}
// 获取供应商
function fetchVendors (vue) {
  return vue.$store.dispatch('setVendors', vue)
}
// 获取员工
function fetchEmployees (vue) {
  return vue.$store.dispatch('setEmployees', vue)
}

export {
  init
}
