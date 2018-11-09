<template>
  <BaseTable
    ref="table"
    :columns="columns"
    :data="data"
    :summary-method="getSummaries"
    show-summary>
    <template
      slot="unit"
      slot-scope="scope">
      {{
        $translate({
          key: 'AfterSales_Unit',
          value: scope.row.unit
        })
      }}
    </template>
    <template
      slot="metarialStatus"
      slot-scope="scope">
      {{
        $translate({
          key: 'AfterSales_OrderStatus_POStatus',
          value: scope.row.metarialStatus
        })
      }}
    </template>
  </BaseTable>
</template>

<script>

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  computed: {
    columns () {
      let columns = [
        {
          label: '商品名称',
          prop: 'prodName'
        },
        {
          label: '商品编码',
          prop: 'prodCode'
        },
        {
          label: '单位',
          slotName: 'unit'
        },
        {
          label: '规格型号',
          prop: 'product.specmodel'
        },
        {
          label: '品牌',
          prop: 'product.brand'
        },
        {
          label: '批次',
          prop: 'prodBatch.prodBatchName'
        },
        {
          label: '仓库',
          prop: 'warehouse.warehouseName'
        },
        {
          label: '库区',
          prop: 'zone.zoneName'
        },
        {
          label: '赠送数量',
          prop: 'giftQty'
        },
        {
          label: '库位',
          prop: 'bin.binName'
        },
        {
          label: '账面数量',
          prop: 'qtyInv'
        },
        {
          label: '账面金额',
          prop: 'invValue'
        },
        {
          label: '实盘数量',
          prop: 'qtyStocktaking'
        },
        {
          label: '实盘金额',
          prop: 'invStocktaking'
        }
      ]
      return columns
    }
  },
  created () {
    console.log(this.data)
  },
  methods: {
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            if (column.property === 'prodName' ||
              column.property === 'prodCode' ||
              column.property === 'unit' ||
              column.property === 'product.specmodel' ||
              column.property === 'product.brand') {
              return ''
            }
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = ''
        }
      })
      sums[columns.length - 1] = sums[9] - sums[11]
      return sums
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
