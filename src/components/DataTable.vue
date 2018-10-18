<template>
  <div
    v-loading="loading"
    :element-loading-text="$t('loading_text')"
    class="data-table">
    <div class="table">
      <el-table
        ref="table"
        :data="data"
        v-bind="_tableProps"
        v-on="tableConfig.events">
        <template v-for="(column, index) in _columns">
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
    <div class="pagination">
      pagination
    </div>
  </div>
</template>
<script>
import _ from 'lodash'

// 表格组件默认值
const TABLE_DEFAULT = {
  'size': 'small'
}

// 表格组件列默认值
const TABLE_COL_DEFAULT = {
  'show-overflow-tooltip': true
}

// 分页组件默认值
const PAGINATION_DEFAULT = {

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
    },
    tableConfig: {
      type: Object,
      default: () => {
        return {
          props: TABLE_DEFAULT,
          events: {}
        }
      }
    },
    paginationConfig: {
      type: Object,
      default: () => {
        return {
          props: PAGINATION_DEFAULT,
          events: {}
        }
      }
    }
  },
  data () {
    return {
      loading: false,
      tableDefault: TABLE_DEFAULT,
      tableColDefault: TABLE_COL_DEFAULT,
      paginationDefault: PAGINATION_DEFAULT
    }
  },
  computed: {
    _tableProps () {
      return _.assign({}, this.tableDefault, this.tableConfig.props)
    },
    _columns () {
      return this.columns.map(column => {
        return _.assign({}, this.tableColDefault, column)
      })
    },
    _paginationProps () {
      return _.assign({}, this.paginationDefault, this.paginationConfig.props)
    }
  },
  watch: {

  },
  created () {

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
