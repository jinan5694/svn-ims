/**
 * 工具方法
 */
import _ from 'lodash'

const timeToDate = time => {
  if (!time) return ''
  return time.split(' ')[0]
}

// 翻译业务数据
const translateBiz = (id, bizs) => {
  return bizs.find(item => item.id === id) || {}
}

// 将 value 转换为数字，如果 NaN ，返回 0
const toNumber = (value) => {
  return _.toNumber(value) || 0
}

export {
  timeToDate,
  translateBiz,
  toNumber
}
