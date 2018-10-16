import Vue from 'vue'
import Axios from 'axios'
import { logout } from '@/common/login'

const vue = new Vue()
const instance = Axios.create({
  // baseUrl处理的不合理
  baseURL: `${process.env.BASE_URL}api`
})

instance.interceptors.request.use(config => {
  // set token
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.token = token
  }
  // get请求参数处理
  if (config.param) {
    const methods = ['get', 'delete']
    if (methods.some(type => type === config.method)) {
      config.params = {
        param: JSON.stringify(config.param)
      }
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  const data = response.data
  if (data.success) {
    // session timeout
    if (data.status === 'Redirect') {
      logout()
    }
    return data
  } else {
    // 业务异常，自行处理
    console.error(`[business exception] ${data.exceptionMessage}`)
    return Promise.reject(data)
  }
}, error => {
  vue.$message.error({
    title: '异常',
    message: '服务器异常'
  })
  console.error(error)
  return Promise.reject(error)
})

Vue.prototype.$axios = instance
