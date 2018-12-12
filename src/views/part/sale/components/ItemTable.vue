<template>
  <BaseTable
    ref="table"
    :columns="columns"
    :data="data"
    :summary-method="getSummaries"
    show-summary
  >
    <template
      slot="unit"
      slot-scope="scope"
    >
      {{
        $translate({
          key: 'AfterSales_Unit',
          value: scope.row.unit
        })
      }}
    </template>
    <template
      slot="metarialStatus"
      slot-scope="scope"
    >
      {{
        $translate({
          key: 'AfterSales_OrderMetarialStatus',
          value: scope.row.metarialStatus
        })
      }}
    </template>
    <template
      slot="OwningQty"
      slot-scope="scope"
    >
      {{
        scope.row.qty - scope.row.inQty
      }}
    </template>
  </BaseTable>
</template>

<script>
import { formatNumber } from '@/common/utils.js'

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
          label: '销售数量',
          prop: 'orderQty'
        },
        {
          label: '销售单价',
          prop: 'price',
          formatter: row => formatNumber(row.amount, 'amount')
        },
        {
          label: '金额',
          prop: 'amount',
          formatter: row => formatNumber(row.amount, 'amount')
        },
        {
          label: '状态',
          slotName: 'metarialStatus'
        },
        {
          label: '出库数量',
          prop: 'outQty'
        },
        {
          label: '欠货数量',
          prop: 'OwningQty',
          slotName: 'OwningQty'
        }
      ]
      return columns
    }
  },
  methods: {
    remove (index) {
      this.$emit('remove', index)
    },
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
              let res = prev + curr
              if (column.property === 'price' || column.property === 'amount') {
                return formatNumber(res, 'amount')
              } else {
                return formatNumber(res)
              }
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = ''
        }
      })
      sums[columns.length - 1] = sums[5] - sums[9]
      return sums
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
