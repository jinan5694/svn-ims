<script>
const DEFAULT_PROPS = {
  size: 'mini',
  stripe: true
}

const DEFAULT_EVENTS = {
  // default events
}

const DEFAULT_COL_PROPS = {
  showOverflowTooltip: true
}

export default {
  name: 'BaseTable',
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    props () {
      return Object.assign({}, DEFAULT_PROPS, this.$attrs)
    },
    events () {
      return Object.assign({}, DEFAULT_EVENTS, this.$listeners)
    }
  },
  methods: {
    getSlotName (column) {
      return column.type === 'expand' ? 'expand' : column.slotName
    },
    getScopedSlots (instance, name) {
      if (instance === undefined) {
        return null
      }
      if (instance.$scopedSlots[name]) {
        return instance.$scopedSlots[name]
      } else {
        return this.getScopedSlots(instance.$parent, name)
      }
    },
    renderColumn (column) {
      const data = { props: Object.assign({}, DEFAULT_COL_PROPS, column) }
      const slotName = this.getSlotName(column)
      if (slotName) {
        const slotRender = this.getScopedSlots(this, slotName)
        if (slotRender) {
          const scopedSlots = {
            default (scope) {
              return slotRender({
                index: scope.$index,
                row: scope.row
              })
            }
          }
          data.scopedSlots = scopedSlots
        } else {
          console.warn('[BaseTable] slot defined but not found. name is: ' + slotName)
        }
      }
      return <el-table-column {...data} />
    }
  },
  render () {
    const data = {
      props: this.props,
      on: this.events
    }
    return (
      <el-table ref="table" { ...data }>
        {
          this.columns.map(column => {
            return this.renderColumn(column)
          })
        }
      </el-table>
    )
  }
}
</script>

<style lang='scss' scoped>

</style>
