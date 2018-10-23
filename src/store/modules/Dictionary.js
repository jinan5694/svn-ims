export default {
  state: {
    dicts: {}
  },
  mutations: {
    setDicts (state, dicts) {
      state.dicts = convertToMap(dicts)
    }
  },
  actions: {
    setDicts ({ commit }, vue) {
      const url = '/DictionaryService/query'
      const params = [{ order: { sort: 1 } }]
      return vue.$axios.get(url, { params: params }).then(resp => {
        commit('setDicts', resp.data)
      })
    }
  }
}

function convertToMap (list) {
  const dicts = {}
  list.forEach(item => {
    append(item, dicts)
  })
  return dicts
}

function append (item, dicts) {
  if (isDict(item)) {
    dicts[item.code] = item.children
  }
  if (item.children && item.children.length) {
    item.children.forEach(item => {
      append(item, dicts)
    })
  }
}

function isDict (item) {
  if (item.leaf) {
    return false
  } else {
    const children = item.children
    if (children && children.length) {
      const child = children[0]
      if (child.leaf) {
        return true
      }
    }
    return false
  }
}
