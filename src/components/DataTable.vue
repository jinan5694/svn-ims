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
        <template v-for="(column, index) in cols">
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
 * 解决【请求数据】【代理分页】
 * params 的格式，请在 /common/params.js 中处理
 */
import _ from 'lodash'
import mergeParams from '@/common/params'

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
      page: {
        pageNumber: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  computed: {
    cols () {
      return this.columns.map(column => {
        return _.assign({}, TABLE_COL_DEFAULT, column)
      })
    },
    tableBinds () {
      return _.assign({}, TABLE_DEFAULT, this.tableConfig.props)
    },
    paginationBinds () {
      return _.assign({}, PAGINATION_DEFAULT, this.paginationConfig.props)
    },
    // params
    _params () {
      const params = mergeParams(this.params)
      _.set(params, '[0].page', this.page)
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
      this.page.pageNumber = pageNumber
      this.fetch()
    },
    handleSizeChange (pageSize) {
      console.log('inner handleSizeChange')
      this.page.pageSize = pageSize
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

<style lang='scss'>
.data-table {
  .el-table__empty-block {
    min-height: 200px;
  }
  .pagination {
    margin: 8px 0;
  }
}
</style>
