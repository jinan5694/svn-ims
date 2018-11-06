<template>
  <Page>
    <template slot="toolbar">
      <el-button type="primary">{{ $t('ok') }}</el-button>
      <el-button>{{ $t('back') }}</el-button>
    </template>
    <BaseTable
      :columns="columns"
      :data="tableData"
      :span-method="spanMethod"
      border>
      <!-- slot -->
    </BaseTable>

  </Page>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          id: '1',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          rowspan: 3
        },
        {
          id: '1',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          rowspan: 0
        },
        {
          id: '1',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          rowspan: 0
        },
        {
          id: '2',
          date: '2016-05-01',
          name: '张曼玉',
          address: '上海市普陀区金沙江路 1516 弄',
          rowspan: 3,
          colspan: 1
        },
        {
          id: '2',
          date: '2016-05-02',
          name: '张曼玉',
          address: '上海市普陀区金沙江路 1516 弄',
          rowspan: 0,
          colspan: 1
        },
        {
          id: '2',
          date: '2016-05-03',
          name: '张曼玉',
          address: '上海市普陀区金沙江路 1516 弄',
          rowspan: 0,
          colspan: 1
        }
      ],
      ids: ['1', '2']
    }
  },
  computed: {
    columns () {
      return [
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
        }
      ]
    },
    data () {
      return this.tableData.map(item => {

      })
    }
  },
  methods: {
    spanMethod ({ row, column, rowIndex, columnIndex }) {
      // debugger
      console.log(`rowIndex:${rowIndex}, columnIndex:${columnIndex}`)
      if (columnIndex === 0) {
        return {
          rowspan: row.rowspan || 1,
          colspan: row.colspan || 1
        }
      }
      // if (columnIndex < 2) {
      //   if (rowIndex % 3 === 0) {
      //     return {
      //       rowspan: 3,
      //       colspan: 1
      //     }
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 1
      //     }
      //   }
      // }
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
