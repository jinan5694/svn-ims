<script>
const DEFAULT_PROPS = {
  'label-width': '80px'
}

const DEFAULT_EVENTS = {
  // default events
}

export default {
  name: 'GridForm',
  props: {
    // items 中定义 span 属性表示合并行。默认为 1， 不能大于 numberOfColumns
    items: {
      type: Array,
      default: () => []
    },
    // 表单每行最多 item 数量，默认4列
    numberOfColumns: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {
      gutter: 20
    }
  },
  computed: {
    props () {
      return Object.assign({}, DEFAULT_PROPS, this.$attrs)
    },
    events () {
      return Object.assign({}, DEFAULT_EVENTS, this.$listeners)
    },
    // 处理合并信息
    rows () {
      const rows = []
      const counter = []
      const numberOfColumns = this.numberOfColumns
      let curRowIndex = 0
      this.items.forEach((item, index) => {
        let curRowCount = counter[curRowIndex] || 0
        const curItemSpan = Math.min(item.span || 1, this.numberOfColumns)
        if ((curRowCount + curItemSpan) > numberOfColumns) {
          curRowIndex += 1
          counter[curRowIndex] = curItemSpan
          rows[curRowIndex] = [item]
        } else {
          if (counter[curRowIndex]) {
            counter[curRowIndex] += curItemSpan
          } else {
            counter[curRowIndex] = curItemSpan
          }
          if (rows[curRowIndex]) {
            rows[curRowIndex].push(item)
          } else {
            rows[curRowIndex] = [item]
          }
        }
      })
      return rows
    },
    span () {
      return 24 / this.numberOfColumns
    }
  },
  methods: {
    validate () {
      return this.$refs.form.validate()
    }
  },
  render () {
    const rows = this.rows.map(row => {
      return (
        <el-row gutter={ this.gutter }>
          {
            row.map(item => {
              const span = this.span * (item.span || 1)
              return (
                <el-col span={ span }>
                  <el-form-item {...{ props: item }}>
                    {
                      this.$slots[item.slotName || item.prop]
                    }
                  </el-form-item>
                </el-col>
              )
            })
          }
        </el-row>
      )
    })
    const data = {
      props: this.props,
      on: this.events
    }
    return <el-form ref="form" { ...data }>{ rows }</el-form>
  }
}
</script>
