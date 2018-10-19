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
        v-bind="_paginationProps"
        v-on="paginationConfig.events"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"/>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'

// 表格组件默认值
const TABLE_DEFAULT = {
  'size': 'mini',
  'stripe': true
}

// 表格组件列默认值
const TABLE_COL_DEFAULT = {
  'show-overflow-tooltip': true
}

// 分页组件默认值
const PAGINATION_DEFAULT = {
  'background': true,
  'pager-count': 7,
  'page-size': 10,
  'page-sizes': [10, 20, 50],
  'layout': 'prev, pager, next, ->, sizes, total'
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
      data: [],
      loading: false,
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
      return _.assign({}, TABLE_DEFAULT, this.tableConfig.props)
    },
    _columns () {
      return this.columns.map(column => {
        return _.assign({}, TABLE_COL_DEFAULT, column)
      })
    },
    _paginationProps () {
      return _.assign({}, PAGINATION_DEFAULT, this.paginationConfig.props)
    },
    _params () {
      // todo 对外部传参数支持有问题
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
    handleCurrentChange (pageNumber) {
      console.log('inner handleCurrentChange')
      this.defaultPage.pageNumber = pageNumber
      this.fetch()
    },
    handleSizeChange (pageSize) {
      console.log('inner handleSizeChange')
      this.defaultPage.pageSize = pageSize
      this.fetch()
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
.data-table {
  .table {
    min-height: 200px;
  }
  .pagination {
    margin: 8px 0;
  }

}
</style>
