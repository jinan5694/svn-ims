import Vue from 'vue'
import * as utils from '@/common/utils'

Object.keys(utils).forEach(key => {
  Vue.filter(key, utils[key])
})
