
function init (vue) {
  return _getCurrentUser(vue)
}

// 获取当前用户信息
function _getCurrentUser (vue) {
  return vue.$store.dispatch('setUser', vue)
}

export {
  init
}
