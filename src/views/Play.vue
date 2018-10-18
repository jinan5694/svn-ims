<template>
  <Page>
    <template slot="toolbar">
      <el-button @click="handleFetch">fetch</el-button>
    </template>
    <DataTable
      ref="table"
      url="/WorkOrderHeadService/query"
      :params="getParam()"
      :columns="columns"
      :data="tableData"
      :table-config="tableConfig"
      :pagination-config="paginationConfig"
      size="mini">
      <template
        slot="expand"
        slot-scope="{row, index}">
        {{ row }}
        {{ index }}
      </template>
      <template
        slot="test"
        slot-scope="{row, index}">
        {{ row }}
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
          border: true
        },
        events: {
          select: this.handleSelect
        }
      },
      paginationConfig: {
        props: {
          total: 100
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
          prop: 'name'
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
          slotName: 'test'
        }
      ],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    getParam () {
      return [
        {
          where: {
            and: [
              { enableFlag: 'System_EnableFlag_1' },
              { orderStatus: { ne: 'AfterSales_OrderStatus_WOStatus_999' } }
            ],
            or: []
          }
        },
        // 增加会员卡号查询path
        [
          'servedObj',
          'servedOrg.mcInstance',
          'finVirtualItems.product'
        ]
      ]
    },
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
      this.$refs.table.fetch()
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
