import Vue from 'vue'

function translate (params) {
  const defaultParams = {
    key: '',
    value: '',
    code: 'code',
    label: 'label',
    unMatchStr: '未定义'
  }
  const options = Object.assign(defaultParams, params)

  if (options.key === '') {
    console.warn('[translate] params.key is required.')
    return options.unMatchStr
  }
  let dicts = this.$store.state.Dictionary.dicts
  let currentDict = dicts[options.key]

  if (currentDict) {
    let results = currentDict.filter(item => {
      return item[options.code] === options.value
    })
    if (results.length) {
      return results[0][options.label]
    }
    console.warn('[translate] item not found. item is:' + options.value)
    return options.unMatchStr
  }
  console.warn('[translate] dist not found. key is:' + options.key)
  return options.unMatchStr
}

/**
 * 获取字典选项
 */
function getDictByKey (key) {
  let dicts = this.$store.state.Dictionary.dicts
  return dicts[key]
}

Vue.prototype.$translate = translate
Vue.prototype.$getDictByKey = getDictByKey
