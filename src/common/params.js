import _ from 'lodash'

const where = {
  and: [
    { enableFlag: 'System_EnableFlag_1' }
  ],
  or: []
}

const order = {
  updatedTime: 0
}

/**
 * 合并
 */
function mergeParams (params) {
  const query = _.cloneDeep(params[0])
  params[0] = {
    where: _.assign({}, where, query.where),
    order: _.assign({}, order, query.order)
  }
  return params
}

export default mergeParams
