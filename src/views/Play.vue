<template>
  <Page>
    <DataTable
      :columns="columns"
      :data="tableData"
      @select="handleSelect"
      border
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
    handleSelect (selection, row) {
      console.log('select', selection, row)
    },
    test (scope) {
      debugger
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
