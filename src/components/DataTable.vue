<template>
  <div
    v-loading="loading"
    :element-loading-text="$t('loading_text')"
    class="data-table">
    <el-table
      ref="table"
      :data="data"
      v-bind="attrs"
      v-on="$listeners">
      <template v-for="(column, index) in innerColumns">
        <el-table-column
          v-if="needSlot(column)"
          :key="columnKey(column, index)"
          v-bind="column">
          <template slot-scope="scope">
            <slot
              :index="scope.$index"
              :name="getSlotName(column)"
              :row="scope.row"/>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="columnKey(column, index)"
          v-bind="column"/>
      </template>
    </el-table>
  </div>
</template>
<script>
import _ from 'lodash'

// 表格组件默认值
const TABLE_ATTR_DEFAULT = {
  'border': true,
  'size': 'small'
}

// 表格组件列默认值
const TABLE_COL_ATTR_DEFAULT = {
  'show-overflow-tooltip': true
}

export default {
  name: 'DataTable',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      loading: false,
      tableAttrDefault: TABLE_ATTR_DEFAULT,
      tableColAttrDefault: TABLE_COL_ATTR_DEFAULT
    }
  },
  computed: {
    attrs () {
      return _.assign({}, this.tableAttrDefault, this.$attrs)
    },
    innerColumns () {
      return this.columns.map(column => {
        return _.assign({}, this.tableColAttrDefault, column)
      })
    }
  },
  watch: {

  },
  methods: {
    // key
    columnKey (column, index) {
      return `${index}_${column.prop || ''}`
    },
    getSlotName (column) {
      return column.type === 'expand' ? 'expand' : column.slotName
    },
    needSlot (column) {
      return column.type === 'expand' || column.slotName
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
