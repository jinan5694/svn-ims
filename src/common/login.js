// public
function hasLogged () {
  return localStorage.getItem('token') || false
}

function logout (vue) {
  vue.$axios.get('/SSOService/logout').then((response) => {
    _clearToken()
    vue.$router.push('/login')
  })
}

// private
function _clearToken () {
  localStorage.removeItem('token')
}

export {
  hasLogged,
  logout
}
