const TOKEN_KEY = 'access_token'

const TokenService = {
  getToken () {
    return localStorage.getItem(TOKEN_KEY)
  },

  saveToken (token) {
    localStorage.setItem(token)
  },

  removeToken (token) {
    localStorage.removeItem(token)
  }
}

export { TokenService }
