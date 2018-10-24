/**
 * 工具方法
 */

const timeToDate = time => {
  if (!time) return ''
  return time.split(' ')[0]
}

// 翻译业务数据
const translateBiz = (id, bizs) => {
  return bizs.find(item => item.id === id) || {}
}

export {
  timeToDate,
  translateBiz
}
