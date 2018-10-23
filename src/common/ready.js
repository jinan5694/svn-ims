import Axios from 'axios'

function init (vue) {
  return fetchUser(vue).then(() => {
    const tasks = []
    tasks.push(fetchDicts(vue))

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

export {
  init
}
