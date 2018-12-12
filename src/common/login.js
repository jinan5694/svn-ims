// public
function isLoggedIn () {
  return localStorage.getItem('token') || false
}

function login (vue, params) {
  const url = '/SSOService/loginNotCaptcha'
  return vue.$axios.post(url, [params]).then(resp => {
    window.localStorage.setItem('token', resp.data)
    return resp
  })
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
  isLoggedIn,
  login,
  logout
}
