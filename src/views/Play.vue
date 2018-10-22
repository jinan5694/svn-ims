<template>
  <Page>
    <template slot="toolbar">
      <el-input v-model="searchKey"/>
      <el-button @click="handleFetch">fetch</el-button>
    </template>
    <DataTable
      ref="table"
      url="/WorkOrderHeadService/query"
      :params="params"
      :columns="columns"
      :table-config="tableConfig"
      :pagination-config="paginationConfig">
      <template
        slot="expand"
        slot-scope="{row, index}">
        {{ `${row.id} - ${index}` }}
      </template>
      <template
        slot="test"
        slot-scope="{row, index}">
        <el-button type="text">{{ $t('view') }}</el-button>
      </template>
    </DataTable>
  </Page>
</template>
<script>

export default {
  data () {
    return {
      tableConfig: {
        props: {
          'show-summary': true,
          'summary-method': () => {
            return ['合计', null, null, 10, 30, 40, null]
          }
        },
        events: {
          select: this.handleSelect
        }
      },
      paginationConfig: {
        props: {
          // small: true
        },
        events: {
          'current-change': this.handleCurrentChange,
          'size-change': this.handleSizeChange
        }
      },
      columns: [
        {
          type: 'expand'
        },
        {
          type: 'index'
        },
        {
          type: 'selection'
        },
        {
          label: '姓名',
          prop: 'orderNo'
        },
        {
          label: '日期',
          prop: 'date'
        },
        {
          label: '地址',
          prop: 'address'
        },
        {
          label: '测试',
          slotName: 'test',
          align: 'center',
          width: 100
        }
      ],
      searchKey: ''
    }
  },
  computed: {
    params () {
      return [
        {
          where: {
            and: [
              { enableFlag: 'System_EnableFlag_1' },
              { orderStatus: { ne: 'AfterSales_OrderStatus_WOStatus_999' } },
              {
                orderNo: {
                  like: this.searchKey
                }
              }
            ]
          }
        },
        [
          'servedObj',
          'servedOrg.mcInstance',
          'finVirtualItems.product'
        ]
      ]
    }
  },
  methods: {
    handleSelect (selection, row) {
      console.log('select', selection, row)
    },
    // events
    handleCurrentChange () {
      console.log('outer handleCurrentChange')
    },
    handleSizeChange () {
      console.log('outer handleSizeChange')
    },
    handleFetch () {
      console.log(`outer searchKey is: ${this.searchKey}`)
      this.$refs.table.fetch()
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
