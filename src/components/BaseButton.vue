<script>
import _ from 'lodash'
const TYPES = {
  // in header toolbar
  add: {
    local: 'add',
    type: 'primary'
  },
  save: {
    local: 'save',
    type: 'primary'
  },
  search: {
    local: 'search',
    type: 'primary'
  },
  print: {
    local: 'print',
    type: 'primary'
  },
  back: {
    local: 'back',
    click: () => window.history.back()
  },
  // in table operator
  view: {
    local: 'view',
    size: 'mini',
    type: 'text'
  },
  edit: {
    local: 'edit',
    size: 'mini',
    type: 'text'
  },
  stop: {
    local: 'stop',
    size: 'mini',
    type: 'text'
  }
}
export default {
  functional: true,
  props: {
    type: {
      type: String,
      default: null
    }
  },
  render (h, ctx) {
    const { data, text } = getDataAndText(ctx)
    return h('el-button', data, text)
  }
}

function getDataAndText (ctx) {
  const config = TYPES[ctx.props.type]
  if (config) {
    if (config.type) {
      _.set(ctx.data, 'props.type', config.type)
    }
    if (config.size) {
      _.set(ctx.data, 'props.size', config.size)
    }
    if (config.click) {
      _.set(ctx.data, 'on.click', config.click)
    }
    return {
      data: ctx.data,
      text: ctx.parent.$t(config.local)
    }
  } else {
    return { data: null, text: 'unknow type' }
  }
}
</script>
