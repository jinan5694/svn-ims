<template>
  <Page>
    <template slot="toolbar">
      <el-button type="primary">{{ $t('ok') }}</el-button>
      <el-button>{{ $t('back') }}</el-button>
    </template>
    <BaseTable
      :columns="columns"
      :data="renderData"
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
          rowspan: 1,
          colspan: 1
        },
        {
          id: '1',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          rowspan: 1,
          colspan: 1
        },
        {
          id: '1',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          rowspan: 1,
          colspan: 1
        },
        {
          id: '2',
          date: '2016-05-01',
          name: '张曼玉',
          address: '上海市普陀区金沙江路 1516 弄',
          rowspan: 1,
          colspan: 1
        },
        {
          id: '2',
          date: '2016-05-02',
          name: '张曼玉',
          address: '上海市普陀区金沙江路 1516 弄',
          rowspan: 1,
          colspan: 1
        },
        {
          id: '2',
          date: '2016-05-03',
          name: '张曼玉',
          address: '上海市普陀区金沙江路 1516 弄',
          rowspan: 1,
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
    renderData () {
      const data = this.$_.cloneDeep(this.tableData)
      let firstId = null
      let firstIndex = 0
      data.forEach((item, index) => {
        if (item.id !== firstId) {
          // 第一次出现
          firstId = item.id
          item.rowspan = 1
          firstIndex = index
        } else {
          item.rowspan = 0
          data[firstIndex].rowspan += 1
        }
      })
      return data
    }
  },
  methods: {
    spanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return {
          rowspan: row.rowspan,
          colspan: row.colspan
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
