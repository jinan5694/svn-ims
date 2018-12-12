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

// 数量金额小数位数格式化
const formatNumber = (val, type) => {
  let temp = parseFloat(val)
  if (isNaN(temp)) {
    return ''
  }
  if (type !== 'amount') {
    return temp
  }
  var f = Math.round(temp * 100) / 100
  var s = f.toString()
  var rs = s.indexOf('.')
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + 2) {
    s += '0'
  }
  return s
}

export {
  timeToDate,
  translateBiz,
  toNumber,
  formatNumber
}
