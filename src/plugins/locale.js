import Vue from 'vue'
import _ from 'lodash'
import locale from '@/common/locale'

const translate = (key) => {
  const text = _.get(locale, key, '')
  if (text === '') {
    console.warn(`[locale] the key:"${key}" not matched.`)
  }
  return text
}

Vue.prototype.$t = translate
