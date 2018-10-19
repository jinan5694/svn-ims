<template>
  <div
    v-loading="loading"
    :element-loading-text="$t('loading_text')"
    class="data-table">
    <div class="table">
      <el-table
        ref="table"
        :data="data"
        v-bind="tableBinds"
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
        v-bind="paginationBinds"
        v-on="paginationConfig.events"
        :current-page.sync="page.pageNumber"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"/>
    </div>
  </div>
</template>
<script>
/**
 * DataTable
 * 解决【请求数据】【分页代理】
 * params 默认值设置，请在 /common/params.js 中处理
 */
import _ from 'lodash'

// 表格组件默认值
const TABLE_DEFAULT = {
  // 最小行高
  'size': 'mini',
  // 斑马纹
  'stripe': true
}

// 表格组件列默认值
const TABLE_COL_DEFAULT = {
  'show-overflow-tooltip': true
}

// 分页组件默认值
const PAGINATION_DEFAULT = {
  'background': true,
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
    // params: {
    //   type: Function,
    //   default: () => {}
    // },
    params: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    // 延迟显示loading
    loadingDelay: {
      type: Number,
      default: 300
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
      // 请求是否完成，用于实现loading延迟显示
      responseComplete: false,
      // page about
      page: {
        pageNumber: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  computed: {
    _columns () {
      // 给传进来的 columns 设置默认值
      return this.columns.map(column => {
        return _.assign({}, TABLE_COL_DEFAULT, column)
      })
    },
    tableBinds () {
      return _.assign({}, TABLE_DEFAULT, this.tableConfig.props)
    },
    paginationBinds () {
      return _.assign({}, PAGINATION_DEFAULT, this.paginationConfig.props)
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    // v-for key generator
    columnKey (column, index) {
      return `${index}_${column.prop || ''}`
    },
    getParams () {
      const params = _.cloneDeep(this.params)
      return _.set(params, '[0].page', _.assign({}, this.page))
    },
    getSlotName (column) {
      return column.type === 'expand' ? 'expand' : column.slotName
    },
    needSlot (column) {
      return column.type === 'expand' || column.slotName
    },
    // events
    handleCurrentChange (pageNumber) {
      this.page.pageNumber = pageNumber
      this._fetch()
    },
    handleSizeChange (pageSize) {
      this.page.pageSize = pageSize
      this._fetch()
    },
    /**
     * fetch data
     * 用于外部调用
     */
    fetch () {
      this.page.pageNumber = 1
      this._fetch()
    },
    _fetch () {
      this.showLoading()

      this.$axios.get(this.url, { params: this.getParams() }).then(resp => {
        this.data = resp.data || []
        this.total = resp.total
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err.exceptionMessage
        })
      }).finally(() => {
        this.hideLoading()
      })
    },
    // loading about
    showLoading () {
      this.responseComplete = false
      setTimeout(() => {
        if (!this.responseComplete) {
          this.loading = true
        }
      }, this.loadingDelay)
    },
    hideLoading () {
      this.loading = false
      this.responseComplete = true
    }
  }
}
</script>

<style lang='scss'>
.data-table {
  .el-table__empty-block {
    min-height: 200px;
  }
  .pagination {
    margin: 5px 0;
  }
}
</style>
