import Vue from 'vue'
import Axios from 'axios'
import router from '@/router'
import _ from 'lodash'

import { baseURL } from '@/common/config'

const vue = new Vue()
const instance = Axios.create({
  // baseUrl处理的不合理
  baseURL: baseURL
})

instance.interceptors.request.use(config => {
  // set token
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.token = token
  }
  // get请求参数处理
  if (config.params) {
    const methods = ['get', 'delete']
    if (methods.some(type => type === config.method)) {
      config.paramsSerializer = (params) => {
        const temp = _.cloneDeep(params)
        temp.forEach((item, index) => {
          if (_.isPlainObject(item)) {
            temp[index] = JSON.stringify(item)
          }
        })
        return 'param=' + encodeURIComponent(JSON.stringify(temp))
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
      localStorage.removeItem('token')
      router.push('/login')
    }
    return data
  } else {
    // 业务异常，自行处理
    console.error('[business exception]', getExceptionMsg(response))
    return Promise.reject(data.exceptionMessage)
  }
}, error => {
  vue.$message.error({
    title: '异常',
    message: '服务器异常'
  })
  console.error(error)
  return Promise.reject(error)
})

function getExceptionMsg (resp) {
  const msg = {
    url: _.get(resp, 'config.url'),
    params: _.get(resp, 'config.params'),
    success: _.get(resp, 'data.success'),
    status: _.get(resp, 'data.status'),
    exceptionStackTrace: _.get(resp, 'data.exceptionStackTrace')
  }
  return JSON.stringify(msg, null, 2)
}

Vue.prototype.$axios = instance
