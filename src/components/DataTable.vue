<template>
  <div
    v-loading="loading"
    :element-loading-text="$t('loading_text')"
    class="data-table">
    <div class="table">
      <BaseTable
        ref="table"
        :columns="columns"
        :data="data"
        v-bind="tableConfig.props"
        v-on="tableConfig.events">
        <slot/>
      </BaseTable>
    </div>
    <div
      v-show="paginationVisible"
      class="pagination">
      <el-pagination
        v-bind="paginationBinds"
        :current-page.sync="page.pageNumber"
        :total="total"
        v-on="paginationConfig.events"
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

// 分页组件默认值
const PAGINATION_DEFAULT = {
  'background': true,
  'page-sizes': [5, 10, 20],
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
    // 延迟显示loading
    loadingDelay: {
      type: Number,
      default: 300
    },
    tableConfig: {
      type: Object,
      default: () => {
        return {
          props: {},
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
    paginationBinds () {
      return _.assign({}, PAGINATION_DEFAULT, this.paginationConfig.props)
    },
    paginationVisible () {
      return this.data.length
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    getParams () {
      // clone 是为了不修改原数据
      const params = _.cloneDeep(this.params)
      return _.set(params, '[0].page', _.assign({}, this.page))
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
      this.$nextTick(() => {
        this.page.pageNumber = 1
        this._fetch()
      })
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
  .pagination {
    margin: 5px 0;
  }
}
</style>
