/**
 * 工具方法
 */

const timeToDate = time => {
  if (!time) return ''
  return time.split(' ')[0]
}

export {
  timeToDate
}
