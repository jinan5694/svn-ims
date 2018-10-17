import Vue from 'vue'
import _ from 'lodash'
import locale from '@/common/locale'

const translate = (key) => {
  return _.get(locale, key)
}

Vue.prototype.$t = translate
