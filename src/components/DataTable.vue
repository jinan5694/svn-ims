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
      <el-pagination
        v-bind="paginationConfig.props"
        v-on="paginationConfig.events"
        :total="50"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"/>
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
  'page-size': 10,
  'page-sizes': [10, 20, 50],
  'layout': 'total, sizes, prev, pager, next, jumper'
}

export default {
  name: 'DataTable',
  props: {
    url: {
      type: String,
      default: null
    },
    params: {
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
      // defaults
      tableDefault: TABLE_DEFAULT,
      tableColDefault: TABLE_COL_DEFAULT,
      paginationDefault: PAGINATION_DEFAULT,
      // page
      defaultPage: {
        pageNumber: 1,
        pageSize: 10
      },
      total: 0,
      // fetch
      defaultOrder: { 'updatedTime': 0 }
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
    },
    _params () {
      const params = _.cloneDeep(this.params)
      const param = params[0] || {}
      param.page = _.assign({}, this.defaultPage, param.page)
      param.order = _.assign({}, this.defaultOrder, param.order)
      params[0] = param
      return params
    }
  },
  watch: {

  },
  created () {
    this.fetch()
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
    },
    // events
    handleCurrentChange () {
      console.log('inner handleCurrentChange')
    },
    handleSizeChange (size) {
      console.log('inner handleSizeChange')
    },
    // fetch data
    fetch () {
      this.data = []
      this.loading = true
      this.$axios.get(this.url, { params: this._params }).then(resp => {
        this.data = resp.data || []
        this.total = resp.total
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err.exceptionMessage
        })
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.pagination {
  margin: 8px 0;
}
</style>
