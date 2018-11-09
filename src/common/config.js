// system configs
const debugURL = window.localStorage.getItem('debugURL')
const baseURL = debugURL || `${process.env.BASE_URL}api`
// const baseURL = `http://192.168.3.125:8080` // 林川
// const baseURL = `http://192.168.3.54:8080` // 耿思
console.log(`baseURL is: ${baseURL}`)

export {
  baseURL
}
